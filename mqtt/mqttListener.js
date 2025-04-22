import mqtt from 'mqtt';
import { MongoClient } from 'mongodb';

const broker = process.env.MQTT_BROKER;
const topic = process.env.MQTT_TOPIC;
const mongoUri = process.env.MONGO_URI;

const dbName = 'mqtt';               // este es el que pusiste en tu URI
const collectionName = 'lecturas';   // podés llamarlo como quieras

let mongoClient;
let collection;

export async function startMqttListener() {
  try {
    // 🔗 Conectar a MongoDB solo una vez
    mongoClient = new MongoClient(mongoUri);
    await mongoClient.connect();
    const db = mongoClient.db(dbName);
    collection = db.collection(collectionName);
    console.log('✅ Conectado a MongoDB Atlas');
  } catch (err) {
    console.error('❌ Error al conectar a MongoDB:', err.message);
    return;
  }

  // 🔌 Conectar al broker MQTT
  const client = mqtt.connect(broker);


  client.on('connect', () => {
    console.log('🔌 Conectado al broker MQTT');
    client.subscribe(topic, (err) => {
      if (err) console.error('❌ Error al suscribirse al topic:', err.message);
      else console.log(`📡 Suscrito al topic: ${topic}`);
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
}
