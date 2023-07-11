import { DefaultSession, DefaultUser } from "next-auth";
import { UserRole } from "./roles";

interface IUser extends DefaultUser {
  roles: Partial<Record<UserRole, boolean>>;
}

declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
