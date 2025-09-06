import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TransactionsService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}
  async create(createTransactionDto: CreateTransactionDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: createTransactionDto.user_id,
        },
      });
      if (!user) {
        return JSON.stringify({
          StatusCode: 404,
          Message: `User ${createTransactionDto.user_id} Not found`,
        });
      }
      const transaction = await this.prisma.transactions.create({
        data: {
          user_id: createTransactionDto.user_id,
          amount: createTransactionDto.amount,
          type: createTransactionDto.type,
          category: createTransactionDto.category,
          description: createTransactionDto.description,
          transaction_date: createTransactionDto.transaction_date,
        },
      });
      return JSON.stringify({
        StatusCode: 202,
        Message: `Transaction Created Successfully!`,
        CreatedRecord: transaction,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      const transactions = await this.prisma.transactions.findMany();
      return transactions;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number) {
    try {
      const transactions = await this.prisma.transactions.findUnique({
        where: {
          id: id,
        },
      });
      if (!transactions) {
        return JSON.stringify({
          StatusCode: 404,
          Message: `Transaction Not Found`,
        });
      }
      return transactions;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    try {
      const transactions = await this.prisma.transactions.findUnique({
        where: {
          id: id,
        },
      });
      if (!transactions) {
        return JSON.stringify({
          StatusCode: 404,
          Message: `Transaction Not Found`,
        });
      }

      const findUser = await this.prisma.transactions.findUnique({
        where: {
          id: updateTransactionDto.user_id,
        },
      });
      if (!findUser) {
        return JSON.stringify({
          StatusCode: 404,
          Message: `Invalid User`,
        });
      }
      const updateTransaction = await this.prisma.transactions.update({
        where: {
          id: id,
        },
        data: {
          user_id: updateTransactionDto.user_id,
          amount: updateTransactionDto.amount,
          type: updateTransactionDto.type,
          category: updateTransactionDto.category,
          description: updateTransactionDto.description,
          transaction_date: updateTransactionDto.transaction_date,
        },
      });

      const updatedTransaction = await this.prisma.transactions.findUnique({
        where: {
          id: id,
        },
      });

      if (updateTransaction) {
        return JSON.stringify({
          StatusCode: 202,
          Message: `Transaction Updated`,
          UpdatedRecords: updatedTransaction,
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number) {
    try {
      const transactions = await this.prisma.transactions.findUnique({
        where: {
          id: id,
        },
      });
      if (!transactions) {
        return JSON.stringify({
          StatusCode: 404,
          Message: `Transaction Not Found`,
        });
      }
      const deleteTransaction = await this.prisma.transactions.delete({
        where: {
          id: id,
        },
      });
      return JSON.stringify({
        StatusCode: 200,
        Message: `Successfully Deleted the Transactions!`,
        DeletedRecord: deleteTransaction,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
