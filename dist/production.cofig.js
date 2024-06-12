export default function createSessionOptions(app) {
    const sessionOptions = {
        secret: process.env.SESSION_SECRET || [""],
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false }
    };
    if (app.get("env") === "production") {
        sessionOptions.cookie.secure = true;
    }
    return sessionOptions;
}
