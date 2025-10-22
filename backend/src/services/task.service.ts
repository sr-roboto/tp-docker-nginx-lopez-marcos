import { Task } from '../models/task.model';
import { ITask } from '../interfaces/task.interface';

export class TaskService {
  // Crear una nueva tarea
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

  // Obtener todas las tareas
  static async getAll(): Promise<ITask[]> {
    return await Task.find().sort({ createdAt: -1 });
  }

  // Obtener una tarea por ID
  static async getById(id: string): Promise<ITask | null> {
    return await Task.findById(id);
  }

  // Actualizar una tarea
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

  // Eliminar una tarea
  static async delete(id: string): Promise<ITask | null> {
    return await Task.findByIdAndDelete(id);
  }
}
