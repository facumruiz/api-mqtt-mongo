import mqtt from 'mqtt';
import fs from 'fs';

const brokerUrl = 'mqtts://3.132.251.70'; // MQTT sobre TLS

// Ruta fija al certificado CA
const caPath = '../certs/ca.crt';

const mqttOptions = {
  ca: fs.readFileSync(caPath),
  rejectUnauthorized: true,
};

const client = mqtt.connect(brokerUrl, mqttOptions);

const topic = 'facu/lecturas';
const testMessages = [
  { topic: "dispositivo/temperatura", message: JSON.stringify({ temp: 25, unidad: 'C' }) },
  { topic: "dispositivo/humedad", message: JSON.stringify({ humedad: 60, unidad: '%' }) },
  { topic: "dispositivo/relay1", message: 'Relay 1 ON' },
  { topic: "dispositivo/relay2", message: 'Relay 2 OFF' },
  { topic: "dispositivo/relay3", message: 'Relay 3 ON' },
];


testMessages.forEach(({ topic, message }) => {
  client.publish(topic, message, {}, (err) => {
    if (err) {
      console.error(`❌ Error al publicar en ${topic}:`, err.message);
    } else {
      console.log(`📤 Mensaje enviado a ${topic}: ${message}`);
    }
  });
});

client.on('error', (err) => {
  console.error('🚨 Error de conexión:', err.message);
});
