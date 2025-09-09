export interface IUser {
  _id: string;
  email: string;
  name: string;
  role: Role;
  isBlocked: boolean;
  isVerified: boolean;
}

export type Role = "admin" | "user";
