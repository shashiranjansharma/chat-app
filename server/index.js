import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import connectDB from './database/connection.js';
import routes from './routes/index.js';

const server = express();
server.use(express.json());
env.config({ path: './.env' });
const corsOptions = {
  credentials: true, //access-control-allow-credentials:true
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:6789'],
  optionsSuccessStatus: 200
};
server.use(cors(corsOptions));
server.use('/api/v1', routes);
server.get('/', (req, res) => {
  res.status(201).json('Hey Server');
});

connectDB().then(() => {
  const port = process.env.PORT;
  server.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
});
