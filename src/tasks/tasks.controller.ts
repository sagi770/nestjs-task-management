import { User } from './../auth/user.entity';
import { Task } from './task.entity';
import { Body, Controller, Get, Post, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksService } from './tasks.service';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TasksController');

    constructor(private TasksService: TasksService) { }

    @Get()
    getTasks(
        @Query(ValidationPipe) filterDto: GetTasksFilterDto,
        @GetUser() user: User
    ): Promise<Task[]> {
        this.logger.verbose(`User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(filterDto)}`);
        return this.TasksService.getTasks(filterDto, user)
    }


    @Get('/:id')
    getTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<Task> {
        return this.TasksService.getTaskById(id, user);
    }

    @Delete('/:id')
    deleteTask(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<void> {
        return this.TasksService.deleteTask(id, user);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @GetUser() user: User
    ): Promise<Task> {
        return this.TasksService.updateTaskStatus(id, status, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User
    ): Promise<Task> {
        this.logger.verbose(`User "${user.username}" create new task. Data: ${JSON.stringify(createTaskDto)}`);
        return this.TasksService.createTask(createTaskDto, user)
    }
}
