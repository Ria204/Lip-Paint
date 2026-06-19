import { lipstickModel } from "./lipstick.model";
import { TLipstick } from "./lipstick.interface";
import AppError from "../../app/errors/AppError";
import httpStatus from "http-status";
import { TLogin } from "../auth/auth.interface";
import { User } from "../auth/auth.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../app/config/config.js";

//Add product lipstick by the seller
const addLipstick = async (
  token: string,
  payload: Partial<TLipstick>,
  sellerId: string,
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

  const user = await User.findOne({ email: decoded.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
  }

  const lipstick = await lipstickModel.findOne({ name: payload.name });

  if (lipstick) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Lipstick with this name already exists",
    );
  }

  (payload as any).seller = sellerId;

  const result = await lipstickModel.create(payload);

  return result;
};

//View single lipstick by both seller and purchaser
const viewSingleLipstick = async (token: string, lipstickId: any) => {
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

  const user = await User.findOne({ email: decoded.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
  }

  const lipstick = await lipstickModel.findById(lipstickId);

  if (!lipstick) {
    throw new AppError(httpStatus.NOT_FOUND, "Lipstick not found");
  }

  return lipstick;
};

//View all list of lipsticks by both seller and purchaser
const viewAllLipstick = async (token: string) => {
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

  const user = await User.findOne({ email: decoded.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
  }

  const lipstick = await lipstickModel.find();

  return lipstick;
};

export const lipstickService = {
  addLipstick,
  viewSingleLipstick,
  viewAllLipstick,
};
