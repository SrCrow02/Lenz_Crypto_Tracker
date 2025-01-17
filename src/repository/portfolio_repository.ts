import { Prisma } from '@prisma/client';
import { prisma } from '../db/prisma';

export class PortfolioRepository {
  async create(data: Prisma.PortfolioCreateInput) {
    const newPortfolio = await prisma.portfolio.create({
      data,
    });
    return newPortfolio;
  }

  async findPortfolio(id: number) {
    const portfolio = await prisma.portfolio.findUnique({
      where: {
        id,
      },
    });
    return portfolio;
  }

  async findPortfoliosByUserId(userId: number) {
    const portfolios = await prisma.portfolio.findMany({
      where: {
        userId,
      },
    });
    return portfolios;
  }
}
