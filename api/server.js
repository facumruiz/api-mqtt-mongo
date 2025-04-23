import express from 'express';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


// ✅ This function remains exported and is responsible for starting the API
export function startApi() {
  app.listen(PORT, () => {
    console.log(`✅ API is running at http://localhost:${PORT}`);
  });
}