import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private TasksService: TasksService) { }

    @Get()
    getAllTasks(): Task[] {
        return this.TasksService.getAllTasks()
    }

    @Post()
    createTask(
        @Body('title') title: string,
        @Body('description') description: string,
    ) {
        return this.TasksService.createTask(title, description)
    }
}
