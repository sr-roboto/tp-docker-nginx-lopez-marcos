import mongoose, { Connection } from 'mongoose';
import { EnvConfiguration } from '../configs/env.config';

export class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connection: Connection | null = null;

  private constructor() {}

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async connect(): Promise<Connection> {
    if (this.connection) {
      return this.connection;
    }

    try {
      const mongoURI = `mongodb://${EnvConfiguration.DB_USER}:${EnvConfiguration.DB_PASSWORD}@${EnvConfiguration.DB_HOST}:${EnvConfiguration.DB_PORT}/${EnvConfiguration.DB_NAME}?authSource=admin`;

      await mongoose.connect(mongoURI);
      this.connection = mongoose.connection;

      console.log(`MongoDB conectado: ${this.connection.host}`);

      this.connection.on('error', (err: Error) => {
        console.error('MongoDB error de conexión:', err);
      });

      this.connection.on('disconnected', () => {
        console.log('MongoDB desconectado');
      });

      process.on('SIGINT', async () => {
        await this.disconnect();
      });

      return this.connection;
    } catch (error) {
      console.error('Error conectando a mongo:', (error as Error).message);
      process.exit(1);
    }
  }

  public async disconnect(): Promise<void> {
    if (this.connection) {
      await mongoose.connection.close();
      this.connection = null;
      console.log('MongoDB conexión cerrada');
      process.exit(0);
    }
  }

  public getConnection(): Connection | null {
    return this.connection;
  }
}
