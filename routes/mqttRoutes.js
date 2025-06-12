import express from 'express';
import { connectToMongo } from '../services/mongoService.js';
import { collectionName } from '../config/mqttConfig.js';
import { broker, mqttOptions } from '../config/mqttConfig.js';

import { startMqttListener, stopMqttListener, getMqttListenerStatus } from '../services/mqttListener.js';

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

        client.on('connect', () => {
            client.publish(topic, message, (err) => {
                if (err) {
                    console.error('❌ Error al publicar en MQTT:', err.message);
                    return res.status(500).json({ error: 'Error al publicar el mensaje' });
                }

                console.log(`📤 Publicado en ${topic}: ${message}`);
                res.status(200).json({ success: true, topic, message });
                client.end();
            });
        });

        client.on('error', (error) => {
            console.error('❌ Error de conexión MQTT:', error.message);
            res.status(500).json({ error: 'Error de conexión MQTT' });
        });
    } catch (err) {
        console.error('❌ Error inesperado:', err.message);
        res.status(500).json({ error: 'Error inesperado' });
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
