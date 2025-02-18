import { Module } from "@nestjs/common";
import { ProtectedController } from "./protected.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/modules/users/entities/users.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [ProtectedController],
})
export class ProtectedModule {}
