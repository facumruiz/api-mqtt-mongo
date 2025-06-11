import express from 'express';
import { connectToMongo } from '../services/mongoService.js';
import { collectionName } from '../config/mqttConfig.js';
const router = express.Router();



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

export default router;
