import AppError from "../../app/errors/AppError";
import { TUser } from "./auth.interface";
import { User } from "./auth.model";
import httpStatus from "http-status";
import { TLogin } from "./auth.interface";
import config from "../../app/config/config";
import { createToken } from "./auth.utils";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { sendMail } from "../../app/utils/sendEmail";
import bcrypt from "bcrypt";

//Signup
const signup = async (payload: Partial<TUser>) => {
  const user = await User.findOne({ email: payload.email });

  if (user) {
    throw new AppError(httpStatus.CONFLICT, "User already exists");
  }

  const result = await User.create(payload);

  return result;
};

//Login
const login = async (payload: TLogin) => {
  const user = await User.isUserExists(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exists");
  }

  const passwordMatch = await User.isPasswordMatch(
    payload.password,
    user.password,
  );

  if (!passwordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, "Password does not match");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
    userID: user._id,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_refresh_expires_in,
  );

  return {
    accessToken,
    refreshToken,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

//Refresh Token
const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to proceed!",
    );
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as any,
  ) as JwtPayload;

  console.log(decoded);

  const user = await User.isUserExists(decoded.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
    userID: user._id,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in,
  );

  return {
    accessToken,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

//Forgot Password
const forgotPassword = async (email: string) => {
  const user = await User.isUserExists(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exists");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
    userID: user._id,
  };

  const resetToken = createToken(jwtPayload, config.jwt_access_secret, "10m");

  const resetlink = `${config.reset_password_url}?email=${user.email}&token=${resetToken}`;

  await sendMail(user.email, "Password Reset", resetlink);
};

//Reset Password
const resetPassword = async (
  token: string,
  payload: { email: string; newPassword: string },
) => {
  if (!token) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to proceed!",
    );
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const user = await User.isUserExists(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (decoded.email !== user.email) {
    throw new AppError(httpStatus.FORBIDDEN, "You are forbidden");
  }

  const hashPassword = await bcrypt.hash(
    payload.newPassword as string,
    Number(config.bcrypt_salt_round),
  );

  const result = await User.findOneAndUpdate(
    { email: decoded.email },
    { password: hashPassword, passwordChangedAt: new Date() },
  );

  return result;
};

//Change Password
const changePassword = async (
  payload: { currentPassword: string; newPassword: string },
  token: string,
) => {
  if (!token) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to proceed",
    );
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const user = await User.isUserExists(decoded.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exists");
  }

  const passwordMatch = await bcrypt.compare(
    payload.currentPassword,
    user.password,
  );

  if (!passwordMatch) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Current password does not match",
    );
  }

  if (payload.currentPassword === payload.newPassword) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "New password must be different from current password",
    );
  }

  const newHashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round),
  );

  const result = await User.findOneAndUpdate(
    { email: user.email },
    { password: newHashPassword, passwordChangedAt: new Date(), new: true },
  );

  return result;
};

export const userService = {
  signup,
  login,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
};
