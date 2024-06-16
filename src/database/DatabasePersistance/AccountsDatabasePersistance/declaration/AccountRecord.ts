import { RowDataPacket } from "mysql2/promise";

export default interface AccountRecord extends RowDataPacket {
  account_id: number;
  customer_id: number;
  officer_id: number;
  open_date: string;
  close_date?: string;
  last_activity_date: string;
  status: "ACTIVE" | "CLOSED" | "FROZEN";
  balance: number;
}
