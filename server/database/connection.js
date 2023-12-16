import mongoose from 'mongoose';

async function connect() {
  try {
    const url =
      'mongodb+srv://findshashiranjan:annu@cluster0.fwua99e.mongodb.net/?retryWrites=true&w=majority';
    mongoose.set('strictQuery', true);
    const db = await mongoose.connect(url);
    return db;
  } catch (error) {
    console.error(error);
  }
}

export default connect;
