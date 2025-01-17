import { Prisma } from '@prisma/client';
import { prisma } from '../db/prisma';

export class TransactionRepository {
  async create(data: Prisma.TransactionCreateInput) {
    const newTransaction = await prisma.transaction.create({
      data,
    });
    return newTransaction;
  }

  async findTransaction(id: number) {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
      },
    });
    return transaction;
  }

  async findTransactionsByAssetId(assetId: number) {
    const transactions = await prisma.transaction.findMany({
      where: {
        assetId,
      },
    });
    return transactions;
  }
}
