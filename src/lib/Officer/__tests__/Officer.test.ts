import Officer from "../Officer";
import IDGenerator from "../../IDGenerator/IDGenerator";

test("if officer instance created successfully", () => {
  const officerID = IDGenerator.smallIntRandomID();
  const officer = new Officer({
    officer_id: officerID,
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@gmail.com"
  });

  expect(officer).toHaveProperty("last_name");
  expect(officer).not.toHaveProperty("printer");
  expect(officer.officer_id).toBe(officerID);
});
