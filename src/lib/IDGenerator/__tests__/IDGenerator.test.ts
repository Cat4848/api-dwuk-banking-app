import IDGenerator from "../IDGenerator";

test.each(Array(100).fill(0))("if random ID is small INT", () => {
  const smallIntID = IDGenerator.smallIntRandomID();
  expect(smallIntID).toBeGreaterThanOrEqual(0);
  expect(smallIntID).toBeLessThanOrEqual(32000);
});
