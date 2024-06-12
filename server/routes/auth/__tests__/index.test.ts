import supertest from "supertest";
import authRouter from "..";

test("if returns hello everyone", async () => {
  const res = await supertest(authRouter).get("/");
  expect(res.body).toEqual({message: 'Hello Everyone!'})
});
