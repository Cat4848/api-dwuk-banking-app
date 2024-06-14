import Account from "../Account";
import IDGenerator from "../../IDGenerator/IDGenerator";

test("if account instance created successfully", () => {
  const account = new Account({
    account_id: IDGenerator.smallIntRandomID(),
    customer_id: IDGenerator.smallIntRandomID(),
    officer_id: IDGenerator.smallIntRandomID(),
    open_date: new Date().toISOString(),
    last_activity_date: new Date().toISOString(),
    status: "ACTIVE",
    balance: 100
  });

  expect(account).toHaveProperty("account_id");
  expect(account).toHaveProperty("open_date");
  expect(account).not.toHaveProperty("color");
});
