import "express-session";

declare module "express-session" {
  interface SessionData {
    password: string;
    isAuthenticated: boolean;
  }
}
