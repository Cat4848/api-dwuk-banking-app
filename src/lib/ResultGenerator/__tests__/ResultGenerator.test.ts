import { ResultGenerator } from "../ResultGenerator";

test("if generate success successfully", () => {
  const customersName = '{customers: ["Jane", "Andrew", "Mark"]}';
  const resultGenerator = new ResultGenerator();
  const result = resultGenerator.generateSuccess(customersName);
  expect(result.success).toBe(true);
});

test("if generate error successfully", () => {
  const error = new Error("Customers not found");
  const resultGenerator = new ResultGenerator();
  const result = resultGenerator.generateError(error);
  expect(result.success).toBe(false);
});
