import mongoose, { Document } from 'mongoose';

export interface ITask extends Document {
  _id: mongoose.Types.ObjectId;
  titulo: string;
  descripcion: string;
  estado: 'pendiente' | 'completada';
  createdAt: Date;
  updatedAt: Date;
}
