export function formatIncomingMessage(topic, message) {
    let sensorType = 'desconocido';
    let title = 'Sensor';
    let deviceName = 'Dispositivo IoT';
    let status = message === 'on' ? 'on' : 'off';
  
    if (topic.includes('temperatura')) {
      sensorType = 'temperatura';
      title = 'TEMP';
      deviceName = 'Sensor Exterior';
      status = 'on'; // valores como "23.5" no son "off"
    } else if (topic.includes('humedad')) {
      sensorType = 'humedad';
      title = 'HUM';
      deviceName = 'Sensor Interior';
      status = 'on';
    } else if (topic.includes('relay')) {
      sensorType = 'relay';
      title = topic.split('/')[1]?.toUpperCase() || 'RELAY';
      deviceName = 'Actuador';
    }
  
    return {
      sensorType,
      title,
      value: message,
      status,
      topic,
      timestamp: new Date().toLocaleString('es-AR'),
      isOnline: true,
      deviceName
    };
  }
  