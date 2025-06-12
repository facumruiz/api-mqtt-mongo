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

// Obtener certificado CA desde base64 o desde archivo
let caCert;

if (process.env.MQTT_CA_CERT_BASE64) {
  try {
    caCert = Buffer.from(process.env.MQTT_CA_CERT_BASE64, 'base64');
    console.log('[MQTT] Certificado CA cargado desde variable de entorno base64');
  } catch (err) {
    console.error('[MQTT] Error al decodificar certificado base64:', err);
  }
} else if (process.env.MQTT_CA_PATH) {
  try {
    caCert = fs.readFileSync(process.env.MQTT_CA_PATH);
    console.log('[MQTT] Certificado CA cargado desde archivo local');
  } catch (err) {
    console.error('[MQTT] Error al leer el archivo CA:', err);
  }
} else {
  console.warn('[MQTT] No se especificó un certificado CA');
}

export const mqttOptions = {
  ca: caCert,
  rejectUnauthorized: true,
};