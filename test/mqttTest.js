import mqtt from 'mqtt';

const brokerUrl = 'mqtt://localhost:1883'; // 👈 Funciona sin user/pass

const client = mqtt.connect(brokerUrl); // Sin auth

const topic = 'facu/lecturas';
const mensaje = JSON.stringify({
  sensor: 'rfid',
  uid: 'FACU12345678',
  timestamp: new Date().toISOString()
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
