import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John Doe', role: 'ADMIN', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', role: 'INTERN', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', role: 'INTERN', email: 'bob@example.com' },
    {
      id: 4,
      name: 'Alice Williams',
      role: 'ADMIN',
      email: 'alice@example.com',
    },
    { id: 5, name: 'Mike Brown', role: 'INTERN', email: 'mike@example.com' },
  ];

  findAll(role?: 'INTERN' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => {
        return user.role == role;
      });
      if (rolesArray.length === 0)
        throw new NotFoundException('Role Not found');
      return rolesArray;
    }

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  create(createuserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);

    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createuserDto,
    };

    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, updatedUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, updatedUser: updatedUserDto };
      }
      return user;
    });

    return this.findOne(id);
  }

  deleteUser(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
