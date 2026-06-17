import { model, Schema } from "mongoose";
import { TUser, userModel } from "./auth.interface";
import bcrypt from "bcrypt";
import config from "../../app/config/config";

const userSchema = new Schema<TUser, userModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [/.+@.+\..+/, "Email must contain an @ and be valid"],
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    pincode: {
      type: String,
    },
    role: {
      type: String,
      enum: ["purchaser", "seller"],
      default: "purchaser",
    },
    dateofBirth: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

//Hashing the password before saving to DB
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_round),
    );
  }
});

//Hiding the password after saving
userSchema.post("save", function (info) {
  info.password = "";
});

//Statics Methods
userSchema.statics.isUserExists = async function (email: string) {
  return await this.findOne({ email }).select("+password");
};

userSchema.statics.isPasswordMatch = async function (
  plainTextPassword: string,
  hashPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

export const User = model<TUser, userModel>("users", userSchema);
