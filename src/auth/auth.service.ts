import { Injectable, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { sign } from 'jsonwebtoken';
import { AuthenticateDto } from './dto/authenticate.dto';
import { IAuthenticate, Role } from './interfaces/user.interface';

@Injectable()
export class AuthService {
  users = [
    {
      id: faker.datatype.uuid(),
      userName: 'Terrence Ratke',
      password: 'terrence',
      role: Role.Admin,
    },
    {
      id: faker.datatype.uuid(),
      userName: 'Samoa Jo',
      password: 'samoa',
      role: Role.Customer,
    },
  ];

  authenticate(authenticateDto: AuthenticateDto): IAuthenticate {
    const user = this.users.find(
      (u) =>
        u.userName === authenticateDto.userName &&
        u.password === authenticateDto.password,
    );

    if (!user) throw new NotFoundException('Invalid credentials');

    const token = sign({ ...user }, 'secrete');

    return { token, user };
  }
}
