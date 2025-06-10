import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

export const broker = process.env.MQTT_BROKER;
export const topicTemp = process.env.MQTT_TOPIC_TEMP;
export const topicHum = process.env.MQTT_TOPIC_HUM;
export const topicR1 = process.env.MQTT_TOPIC_R1;
export const topicR2 = process.env.MQTT_TOPIC_R2;
export const topicR3 = process.env.MQTT_TOPIC_R3;
export const dbName = process.env.DB_NAME;
export const collectionName = process.env.MQTT_COLLECTION;
export const mongoUri = process.env.MONGO_URI;

export const mqttOptions = {
  ca: fs.readFileSync(process.env.MQTT_CA_PATH),
  rejectUnauthorized: true,
};
