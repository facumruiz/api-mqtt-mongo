import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

export const broker = process.env.MQTT_BROKER;
export const topic = process.env.MQTT_TOPIC;
export const dbName = process.env.DB_NAME;
export const collectionName = process.env.MQTT_COLLECTION;
export const mongoUri = process.env.MONGO_URI;

export const mqttOptions = {
  ca: fs.readFileSync(process.env.MQTT_CA_PATH),
  rejectUnauthorized: true,
};
