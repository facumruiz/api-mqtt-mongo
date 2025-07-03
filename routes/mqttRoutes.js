import express from 'express';
import { connectToMongo } from '../services/mongoService.js';
import { collectionName } from '../config/mqttConfig.js';
import { broker, mqttOptions } from '../config/mqttConfig.js';
import DeviceModel from '../models/Device.js';
import { startMqttListener, stopMqttListener, getMqttListenerStatus } from '../services/mqttListener.js';
import { formatIncomingMessage } from '../utils/formatMessage.js'; // 👈 FALTA ESTA

const router = express.Router();

// Lista de tópicos permitidos
const allowedTopics = [
  "dispositivo/temperatura",
  "dispositivo/humedad",
  "dispositivo/relay1",
  "dispositivo/relay2",
  "dispositivo/relay3",
];

// GET /api/getMessages
router.get('/getMessages', async (req, res) => {
  try {
    const collection = await connectToMongo(collectionName);
    const messages = await collection.find({}).toArray();
    res.status(200).json(messages);
    console.log("✅ GET all messages with /api/getMessages")
  } catch (error) {
    console.error('❌ Error al obtener los mensajes:', error.message);
    res.status(500).json({ error: 'Error al obtener los mensajes' });
  }
});



// POST /api/publish
router.post('/publish', async (req, res) => {
  const { topic, message } = req.body;

  if (!topic || !message) {
    return res.status(400).json({ error: 'Topic and message are required' });
  }

  if (!allowedTopics.includes(topic)) {
    return res.status(400).json({ error: `Invalid topic. Allowed topics are: ${allowedTopics.join(', ')}` });
  }

  try {
    const mqtt = await import('mqtt');
    const client = mqtt.connect(broker, mqttOptions);

    function publishMqtt(topic, message) {
      return new Promise((resolve, reject) => {
        client.publish(topic, message, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }

    client.on('error', (err) => {
      console.error('❌ Error de conexión MQTT:', err.message);
      client.end();
      if (!res.headersSent) res.status(500).json({ error: 'Error de conexión MQTT' });
    });

    client.on('connect', async () => {
      try {
        await publishMqtt(topic, message);

        // Formatear mensaje para guardar
        const formatted = formatIncomingMessage(topic, message);

        // Guardar en MongoDB nativo
        const collection = await connectToMongo();
        await collection.insertOne(formatted);

        console.log(`📤 Publicado en ${topic}: ${message}`);

        if (!res.headersSent) res.status(200).json({ success: true, topic, message });
      } catch (error) {
        console.error('❌ Error al publicar o guardar:', error.message);
        if (!res.headersSent) res.status(500).json({ error: 'Error al publicar o guardar el mensaje' });
      } finally {
        client.end();
      }
    });
  } catch (err) {
    console.error('❌ Error inesperado:', err.message);
    if (!res.headersSent) res.status(500).json({ error: 'Error inesperado' });
  }
});



// ✅ POST /api/activate
router.post('/activate', (req, res) => {
  const { state } = req.body;

  if (!state || (state !== 'on' && state !== 'off')) {
    return res.status(400).json({ error: 'Estado inválido. Usa "on" o "off"' });
  }

  if (state === 'on') {
    startMqttListener();
    return res.status(200).json({ message: '🔛 Listener activado' });
  } else {
    stopMqttListener();
    return res.status(200).json({ message: '🔴 Listener desactivado' });
  }
});

// ✅ GET /api/status
router.get('/status', (req, res) => {
  const status = getMqttListenerStatus() ? 'on' : 'off';
  res.status(200).json({ status });
});

export default router;
