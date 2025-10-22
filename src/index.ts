import express from 'express';
import { DatabaseConnection } from './database/db';
import { EnvConfiguration } from './configs/env.config';
import taskRoutes from './routes/task.route';
import morgan from 'morgan';
import cors from 'cors';

async function main(): Promise<void> {
  const app = express();
  const port = EnvConfiguration.PORT;

  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());

  const dbConnection = DatabaseConnection.getInstance();
  try {
    await dbConnection.connect();
  } catch (error) {
    await dbConnection.disconnect();
  }

  app.use('/api/tasks', taskRoutes);

  app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
  });
}

main();
