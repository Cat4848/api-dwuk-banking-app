import Officer from "../Officer";
import IDGenerator from "../../IDGenerator/IDGenerator";

test("if officer instance created successfully", () => {
  const officer = new Officer({
    officer_id: IDGenerator.smallIntRandomID(),
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@gmail.com"
  });

  expect(officer).toHaveProperty("last_name");
  expect(officer).toHaveProperty("first_name");
  expect(officer).toHaveProperty("email");
});
