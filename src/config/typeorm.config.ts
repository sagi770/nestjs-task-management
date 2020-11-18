import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'tasksmamagement',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
}