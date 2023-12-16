import express from 'express';
import cors from 'cors';
import connectDB from './database/connection.js';
import routes from './routes/index.js';

const server = express();
server.use(express.json());
server.use(cors());
server.use('/api/v1', routes);

server.get('/', (req, res) => {
  res.status(201).json('Hey Server');
});

connectDB().then(() => {
  // eslint-disable-next-line no-undef
  const port = process.env.PORT || 6789;
  server.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
});
