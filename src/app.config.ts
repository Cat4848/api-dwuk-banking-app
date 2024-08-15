import express, { Express } from "express";
import expressSession from "express-session";
import { SessionOptions } from "express-session";
import MongoStore from "connect-mongo";

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
    this.app.use(expressSession(this.createSessionOptions(this.app)));
  }

  private createSessionOptions(app: Express): SessionOptions {
    const sessionOptions: SessionOptions = {
      secret: process.env.SESSION_SECRET || [""],
      store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
      resave: true,
      saveUninitialized: true
    };

    return sessionOptions;
  }
}
// created local session storage db
