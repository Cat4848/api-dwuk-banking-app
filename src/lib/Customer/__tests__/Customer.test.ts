import Customer from "../Customer";
import IDGenerator from "../../IDGenerator/IDGenerator";

test("if customer instance created successfully", () => {
  const customerID = IDGenerator.smallIntRandomID();
  const customer = new Customer({
    customer_id: customerID,
    officer_id: IDGenerator.smallIntRandomID(),
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@gmail.com"
  });
  
  expect(customer).toHaveProperty("first_name");
  expect(customer).not.toHaveProperty("flour");
  expect(customer.customer_id).toBe(customerID);
});
