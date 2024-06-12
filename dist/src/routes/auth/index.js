import express from "express";
const authRouter = express();
authRouter.get("/", (req, res) => {
    res.json({
        message: "Hello Everyone!",
        sessionSecret: process.env.SESSION_SECRET || "no session secret",
        env: process.env.NODE_ENV || "no node env"
    });
});
authRouter.post("/", (req, res) => { });
export default authRouter;
