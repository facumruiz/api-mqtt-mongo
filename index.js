import mqttRoutes from './routes/mqttRoutes.js';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', mqttRoutes);

export function startApi() {
  app.listen(PORT, () => {
    console.log(`✅ API is running at http://localhost:${PORT}`);
  });
}


// startMqttListener();

startApi();
