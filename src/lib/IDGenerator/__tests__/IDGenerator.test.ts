import IDGenerator from "../IDGenerator";

test("if random ID is small INT", () => {
  const smallIntID = IDGenerator.smallIntRandomID();
  expect(smallIntID).toBeGreaterThanOrEqual(0);
  expect(smallIntID).toBeLessThanOrEqual(32000);
});
