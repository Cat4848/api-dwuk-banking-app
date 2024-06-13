import express, { Express } from "express";
import session from "express-session";
import passport from "passport";

export default class MiddlewareInitializer {
  constructor(app: Express) {
    this.app = app;
  }
  private app: Express;

  initHTTPBodyParsers() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  initSession() {
    this.app.use(session(this.createSessionOptions(this.app)));
  }

  private createSessionOptions(app: Express) {
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

  initAuth() {
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }
}
