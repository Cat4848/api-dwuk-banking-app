import express from "express";
const authRouter = express();
authRouter.get("/", (req, res) => {
    res.json({
        message: "Hello Everyone!",
        sessionSecret: process.env.SESSION_SECRET
    });
});
authRouter.post("/", (req, res) => { });
export default authRouter;
