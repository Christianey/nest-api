import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { Users } from './users';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [Users, UsersService]
})
export class UsersModule {}
