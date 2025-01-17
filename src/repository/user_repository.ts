import { Prisma } from '@prisma/client';
import { prisma } from '../db/prisma';

export class UserRepository {
  async create(data: Prisma.UserCreateInput) {
    const newUser = await prisma.user.create({
      data,
    });
    return newUser;
  }

  async findUser(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    return user;
  }
}
