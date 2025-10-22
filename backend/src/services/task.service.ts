import { Task } from '../models/task.model';
import { ITask } from '../interfaces/task.interface';

export class TaskService {
  static async create(data: {
    titulo: string;
    descripcion: string;
    estado?: 'pendiente' | 'completada';
  }): Promise<ITask> {
    const newTask = new Task({
      titulo: data.titulo,
      descripcion: data.descripcion,
      estado: data.estado || 'pendiente',
    });

    return await newTask.save();
  }

  static async getAll(): Promise<ITask[]> {
    return await Task.find().sort({ createdAt: -1 });
  }

  static async getById(id: string): Promise<ITask | null> {
    return await Task.findById(id);
  }

  static async update(
    id: string,
    data: {
      titulo?: string;
      descripcion?: string;
      estado?: 'pendiente' | 'completada';
    }
  ): Promise<ITask | null> {
    return await Task.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  static async delete(id: string): Promise<ITask | null> {
    return await Task.findByIdAndDelete(id);
  }
}
