import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  Ip,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { UpdateUserDto } from 'src/users/dto/update-user-dto';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { LoggerService } from 'src/logger/logger.service';

@SkipThrottle()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  private readonly logger = new LoggerService(EmployeesController.name);

  @Post()
  create(@Body(ValidationPipe) createEmployeeDto: CreateUserDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @SkipThrottle({ default: false })
  @Get()
  findAll(@Ip() ip: string, @Query('role') role?: 'INTERN' | 'ADMIN') {
    this.logger.log(`Request for all employees from \t${ip}`, EmployeesController.name);
    return this.employeesService.findAll(role);
  }

  @Throttle({ short: { limit: 1, ttl: 1000 } })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateEmployeeDto: UpdateUserDto,
  ) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
