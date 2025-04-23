import { MongoClient } from 'mongodb';
import { mongoUri, dbName, collectionName } from '../config/mqttConfig.js';

let mongoClient;
let collection;



export async function connectToMongo() {
  try {
    mongoClient = new MongoClient(mongoUri);
    await mongoClient.connect();
    const db = mongoClient.db(dbName);
    collection = db.collection(collectionName);
    console.log('✅ Conectado a MongoDB Atlas');
    return collection;
  } catch (err) {
    console.error('❌ Error al conectar a MongoDB:', err.message);
    throw err;
  }
}
