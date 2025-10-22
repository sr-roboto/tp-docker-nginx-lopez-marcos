import mongoose, { Schema, Document } from 'mongoose';
import { ITask } from '../interfaces/task.interface';

const taskSchema = new Schema<ITask>(
  {
    titulo: {
      type: String,
      required: [true, 'El título es requerido'],
      trim: true,
      minlength: [3, 'El título debe tener al menos 3 caracteres'],
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción es requerida'],
      trim: true,
      minlength: [5, 'La descripción debe tener al menos 5 caracteres'],
    },
    estado: {
      type: String,
      enum: {
        values: ['pendiente', 'completada'],
        message: 'El estado debe ser "pendiente" o "completada"',
      },
      default: 'pendiente',
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model<ITask>('Task', taskSchema);
