import mongoose from 'mongoose';

async function connect() {
  try {
    const url = process.env.MONGO_DB_URL;
    mongoose.set('strictQuery', true);
    const db = await mongoose.connect(url);
    return db;
  } catch (error) {
    console.error(error);
  }
}

export default connect;
