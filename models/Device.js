import mongoose from 'mongoose';

const DeviceSchema = new mongoose.Schema({
  sensorType: {
    type: String,
    enum: ['relay', 'temperatura', 'humedad'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  value: {
    type: String, // podría ser 'on', 'off', o un valor numérico como "23.4"
    required: true
  },
  status: {
    type: String,
    enum: ['on', 'off'],
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  timestamp: {
    type: String, // antes era Date, ahora usamos `toLocaleString` (string legible)
    required: true
  },
  isOnline: {
    type: Boolean,
    default: true
  },
  deviceName: {
    type: String,
    required: true
  }
});

const DeviceModel = mongoose.model('Device', DeviceSchema);
export default DeviceModel;
