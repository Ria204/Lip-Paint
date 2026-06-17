import { userRole } from "./auth.constant";
import { Model } from "mongoose";

export type TLogin = {
  email: string;
  password: string;
};

export type TUser = {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  city: string;
  address: string;
  pincode: string;
  role: TUserRole;
  dateofBirth: Date;
  createdAt: Date;
  udpatedAt: Date;
};

export type TUserRole = keyof typeof userRole;

//Custom Methods
export interface userModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser>;
  isPasswordMatch(
    plainTextPassword: string,
    hashPassword: string,
  ): Promise<Boolean>;
}
