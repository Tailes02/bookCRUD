import { TypeOrmModule } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModule = {
  type: "mysql",
  host: 'localhost',
  port: 3306,
  username: 'taile',
  password: "123456",
  database: "nestjs",
  synchronize: true,
  autoLoadEntities: true,
  entities: [__dirname + "/**/*.entity{.ts,.js}"]
};
