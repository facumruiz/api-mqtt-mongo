import dotenv from 'dotenv';
import { startApi } from './api/server.js';
import { startMqttListener } from './mqtt/mqttListener.js';

dotenv.config();


startApi();
startMqttListener();