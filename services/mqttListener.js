import mqtt from 'mqtt';
import { broker, topicTemp, topicHum, topicR1, topicR2, topicR3, mqttOptions, collectionName } from '../config/mqttConfig.js';
import { connectToMongo } from './mongoService.js';

export async function startMqttListener() {
  let collection;

  try {
    collection = await connectToMongo(collectionName);
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    return;
  }

  const client = mqtt.connect(broker, mqttOptions);

  client.on('connect', () => {
    console.log('🔌 Conectado al broker MQTT');

    const topics = [topicTemp, topicHum, topicR1, topicR2, topicR3];

    client.subscribe(topics, (err, granted) => {
      if (err) {
        console.error('❌ Error al suscribirse a los tópicos:', err.message);
      } else {
        granted.forEach(({ topic }) =>
          console.log(`📡 Suscrito al tópico: ${topic}`)
        );
      }
    });
  });

  client.on('message', async (topic, message) => {
    const payload = message.toString();
    console.log(`📩 Mensaje recibido en ${topic}: ${payload}`);

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
