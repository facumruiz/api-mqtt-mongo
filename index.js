import mqttRoutes from './routes/mqttRoutes.js';
import { startMqttListener } from './services/mqttListener.js';


import express from 'express';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', mqttRoutes);



// ✅ This function remains exported and is responsible for starting the API
export function startApi() {
  app.listen(PORT, () => {
    console.log(`✅ API is running at http://localhost:${PORT}`);
  });
}

startMqttListener();
startApi();
