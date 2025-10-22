import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';

export class TaskController {
  // Crear una nueva tarea
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { titulo, descripcion, estado } = req.body;

      if (!titulo || !descripcion) {
        res.status(400).json({
          success: false,
          message: 'El título y la descripción son requeridos',
        });
        return;
      }

      const task = await TaskService.create({
        titulo,
        descripcion,
        estado,
      });

      res.status(201).json({
        success: true,
        message: 'Tarea creada exitosamente',
        data: task,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }
  }

  // Obtener todas las tareas
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await TaskService.getAll();

      res.status(200).json({
        success: true,
        data: tasks,
        total: tasks.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }
  }

  // Obtener una tarea por ID
  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({
          success: false,
          message: 'El ID de la tarea es requerido',
        });
        return;
      }

      const task = await TaskService.getById(id);

      if (!task) {
        res.status(404).json({
          success: false,
          message: 'Tarea no encontrada',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: task,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }
  }

  // Actualizar una tarea
  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { titulo, descripcion, estado } = req.body;

      if (!id) {
        res.status(400).json({
          success: false,
          message: 'El ID de la tarea es requerido',
        });
        return;
      }

      if (!titulo && !descripcion && !estado) {
        res.status(400).json({
          success: false,
          message: 'Al menos un campo para actualizar es requerido',
        });
        return;
      }

      const task = await TaskService.update(id, {
        titulo,
        descripcion,
        estado,
      });

      if (!task) {
        res.status(404).json({
          success: false,
          message: 'Tarea no encontrada',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Tarea actualizada exitosamente',
        data: task,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: (error as Error).message,
      });
    }
  }

  // Eliminar una tarea
  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          message: 'El ID de la tarea es requerido',
        });
        return;
      }

      const task = await TaskService.delete(id);

      if (!task) {
        res.status(404).json({
          success: false,
          message: 'Tarea no encontrada',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Tarea eliminada exitosamente',
        data: task,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }
  }
}
