import Customer from "../Customer";
import IDGenerator from "../../IDGenerator/IDGenerator";

test("if customer instance created successfully", () => {
  const customer = new Customer({
    customer_id: IDGenerator.smallIntRandomID(),
    officer_id: IDGenerator.smallIntRandomID(),
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@gmail.com"
  });
  expect(customer).toHaveProperty("first_name");
  expect(customer).toHaveProperty("last_name");
  expect(customer).toHaveProperty("email");
});
