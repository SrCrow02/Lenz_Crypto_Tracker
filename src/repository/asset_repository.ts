import { Prisma } from '@prisma/client';
import { prisma } from '../db/prisma';

export class AssetRepository {
  async create(data: Prisma.AssetCreateInput) {
    const newAsset = await prisma.asset.create({
      data,
    });
    return newAsset;
  }

  async findAsset(id: number) {
    const asset = await prisma.asset.findUnique({
      where: {
        id,
      },
    });
    return asset;
  }

  async findAssetsByPortfolioId(portfolioId: number) {
    const assets = await prisma.asset.findMany({
      where: {
        portfolioId,
      },
    });
    return assets;
  }
}
