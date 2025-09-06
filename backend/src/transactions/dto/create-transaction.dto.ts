export class CreateTransactionDto {
  user_id: number;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description?: string;
  transaction_date: Date;
}
