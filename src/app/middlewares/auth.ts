
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";
//import { TUserRole } from "../modules/accounts/accounts.interface";
import { NextFunction, Request, Response } from "express";


const auth = (... requiredRoles: any[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization; 

    // Check if there is any token sent by the client or not.
    if (!token) {             
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not authorized to proceed!"
      );
    }

    // Check if the token is valid or not.
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {  //err = token is not valid
        // err
        if (err) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            "You have no access to this route"
          );
        }

        const role = (decoded as JwtPayload).role;

        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            "You have no access to this route"
          );
        }

        // decoded undefined
        req.user = decoded as JwtPayload;  
        next();
      }
    );
  });
};

export default auth;
