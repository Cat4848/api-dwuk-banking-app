import { RowDataPacket } from "mysql2/promise";

export default interface TransactionRecord extends RowDataPacket {
  transaction_id: number;
  from_account_id: number;
  to_account_id: number;
  officer_id: number;
  transaction_date: string;
  amount: number;
}
