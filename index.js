import { startApi } from './api/server.js';
import { startMqttListener } from './services/mqttListener.js';


startApi();
startMqttListener();