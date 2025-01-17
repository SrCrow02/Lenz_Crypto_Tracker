import { PrismaClient, BlackList } from '@prisma/client';

const prisma = new PrismaClient();

export class BlackListRepository {
    async create(token: string): Promise<BlackList> {
        return prisma.blackList.create({
            data: { token }
        });
    }

    async findByToken(token: string): Promise<BlackList | null> {
        return prisma.blackList.findFirst({
            where: { token }
        });
    }

    async findAll(): Promise<BlackList[]> {
        return prisma.blackList.findMany();
    }

    async delete(id: number): Promise<BlackList> {
        return prisma.blackList.delete({
            where: { id }
        });
    }

    /*async deleteByToken(token: string): Promise<BlackList> {
        return prisma.blackList.delete({
            where: { token }
        });
    }*/

    async update(id: number, token: string): Promise<BlackList> {
        return prisma.blackList.update({
            where: { id },
            data: { token }
        });
    }
}