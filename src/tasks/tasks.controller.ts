import { Body, Controller, Get, Post, Param, Delete, Patch } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private TasksService: TasksService) { }

    @Get()
    getAllTasks(): Task[] {
        return this.TasksService.getAllTasks()
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.TasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.TasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus,
    ): Task {
        return this.TasksService.updateTaskStatus(id, status);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.TasksService.createTask(createTaskDto)
    }
}
