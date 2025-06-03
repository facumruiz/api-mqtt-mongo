import mqtt from 'mqtt';
import { broker, topic, mqttOptions, collectionName } from '../config/mqttConfig.js';
import { connectToMongo } from './mongoService.js';


export async function startMqttListener() {
  let collection;

  try {
    collection = await connectToMongo(collectionName);
  } catch {
    return;
  }

  const client = mqtt.connect(broker, mqttOptions);

  client.on('connect', () => {
    console.log('🔌 Conectado al broker MQTT');
    client.subscribe(topic, (err) => {
      if (err) {
        console.error('❌ Error al suscribirse al topic:', err.message);
      } else {
        console.log(`📡 Suscrito al topic: ${topic}`);
      }
    });
  });

  client.on('message', async (topic, message) => {
    const payload = message.toString();
    console.log(`📩 Mensaje recibido: ${payload}`);

    try {
      const result = await collection.insertOne({
        topic,
        mensaje: payload,
        timestamp: new Date(),
      });
      console.log(`✅ Mensaje guardado con ID: ${result.insertedId}`);
    } catch (error) {
      console.error('❌ Error al guardar mensaje en MongoDB:', error.message);
    }
  });

  client.on('error', (error) => {
    console.error('❌ Error de conexión MQTT:', error.message);
  });
}
