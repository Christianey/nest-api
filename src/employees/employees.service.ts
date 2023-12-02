import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    try {
      const employee = await this.databaseService.employee.create({ data: createEmployeeDto });
      return employee
    } catch (error) {
      console.log('email type error');
      console.log('creation error');
      console.log(error);
    }
  }

  async findAll(role?: 'INTERN' | 'ADMIN') {
    if (role)
      return this.databaseService.employee.findMany({ where: { role } });
    return this.databaseService.employee.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.employee.findUnique({ where: { id } });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.employee.delete({ where: { id } });
  }
}