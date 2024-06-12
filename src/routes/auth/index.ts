import express from "express";

const authRouter = express();

authRouter.get("/", (req, res) => {
  res.json({ message: "Hello Everyone!" });
});

authRouter.post("/", (req, res) => {});

export default authRouter;
