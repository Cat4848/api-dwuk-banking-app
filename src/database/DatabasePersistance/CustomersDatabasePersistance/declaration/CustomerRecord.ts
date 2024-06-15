import { RowDataPacket } from "mysql2/promise";

export default interface CustomerRecord extends RowDataPacket {
  customer_id: number;
  officer_id: number;
  first_name: string;
  last_name: string;
  email: string;
}
