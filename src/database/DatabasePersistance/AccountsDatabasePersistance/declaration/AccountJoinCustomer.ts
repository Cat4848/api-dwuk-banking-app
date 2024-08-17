import { RowDataPacket } from "mysql2";

export default interface AccountJoinCustomer extends RowDataPacket {
  account_id: number;
  first_name: string;
  last_name: string;
}
