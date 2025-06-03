import mqtt from 'mqtt';
import fs from 'fs';

const brokerUrl = 'mqtts://52.14.253.32:8883'; // MQTT sobre TLS

// Ruta fija al certificado CA
const caPath = '../certs/ca.crt';

const mqttOptions = {
  ca: fs.readFileSync(caPath),
  rejectUnauthorized: true,
};

const client = mqtt.connect(brokerUrl, mqttOptions);

const topic = 'facu/lecturas';
const mensaje = JSON.stringify({
  sensor: 'rfid',
  uid: 'FACU12345678',
  timestamp: new Date().toISOString(),
});

client.on('connect', () => {
  console.log(`✅ Conectado al broker EMQX: ${brokerUrl}`);
  client.publish(topic, mensaje, (err) => {
    if (err) {
      console.error('❌ Error al publicar:', err);
    } else {
      console.log(`📤 Mensaje publicado en '${topic}':`, mensaje);
    }
    client.end();
  });
});

client.on('error', (err) => {
  console.error('🚨 Error de conexión:', err.message);
});
