import express from 'express';

import cors from 'cors';
import pino from 'pino-http';
import 'dotenv/config';
import { initMongoConnection } from './db/initMongoConnection.js';

import contactsRouters from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
export const setupServer = async () => {
  try {
    await initMongoConnection();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }

  app.use(cors());
  // app.use(express.json());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use('/', contactsRouters);

  app.use(notFoundHandler);
  app.use(errorHandler);
};

export default app;
