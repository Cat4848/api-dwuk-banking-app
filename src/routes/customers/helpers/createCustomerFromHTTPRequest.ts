import { Request } from "express";
import Customer from "../../../lib/Customer/Customer.js";
import officerID from "../../../lib/constants/officerID.js";

export default function createCustomerFromHTTPRequest(req: Request): Customer {
  const customerFromFrontEnd: Customer = req.body;
  const customer = new Customer({
    customer_id: Number(req.params.id),
    officer_id: officerID,
    first_name: customerFromFrontEnd.first_name,
    last_name: customerFromFrontEnd.last_name,
    email: customerFromFrontEnd.email
  });
  return customer;
}
