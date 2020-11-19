import { Task } from './task.entity';
import { Body, Controller, Get, Post, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksService } from './tasks.service';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private TasksService: TasksService) { }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.TasksService.getTasks(filterDto)
    }


    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.TasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.TasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    ): Promise<Task> {
        return this.TasksService.updateTaskStatus(id, status);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.TasksService.createTask(createTaskDto)
    }
}
