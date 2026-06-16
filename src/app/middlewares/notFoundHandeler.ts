import { Request, Response, NextFunction } from 'express';  //we are importing Request, Response, NextFunction from express to define the types of the parameters of the notFoundHandler function. Request is the type for the req parameter, Response is the type for the res parameter, and NextFunction is the type for the next parameter. This helps in providing type safety and better code completion in our IDE.
import AppError from '../errors/AppError';
import httpStatus from 'http-status';

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const err = new AppError(httpStatus.NOT_FOUND, 'Route Not Found');  //we are creating a new instance of the AppError class and passing the status code and the message for the error. The status code is set to 404 (NOT_FOUND) and the message is set to 'Route Not Found'. This error will be thrown when a route is not found in our application.
  next(err);
};

export default notFoundHandler;
