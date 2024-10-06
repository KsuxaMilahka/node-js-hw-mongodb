import dotenv from 'dotenv';
import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

dotenv.config();

const startApp = async () => {
  try {
    await initMongoConnection();

    setupServer();
  } catch (error) {
    console.error('Error during app initialization:', error);
  }
};
console.log('MONGODB_USER:', process.env.MONGODB_USER); //прибрати після вирішення помилки
console.log('MONGODB_PASSWORD:', process.env.MONGODB_PASSWORD); //прибрати після вирішення помилки
console.log('MONGODB_URL:', process.env.MONGODB_URL); //прибрати після вирішення помилки
console.log('MONGODB_DB:', process.env.MONGODB_DB);
startApp();
