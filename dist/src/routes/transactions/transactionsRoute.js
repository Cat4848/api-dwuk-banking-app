import express from "express";
const transactionsRouter = express();
transactionsRouter.get("/", async (req, res) => {
    res.send("transaction route");
});
export default transactionsRouter;
