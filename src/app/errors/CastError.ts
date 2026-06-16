import mongoose from "mongoose";
import { TErrorSourse, TGenericErrorResponse } from "../interface/error.js";

const handleCastError = (err: mongoose.Error.CastError):TGenericErrorResponse => {
    const statusCode = 400;
    const errorSources: TErrorSourse = [{
        path: err?.path,
        message: err?.message
    }]

    return{
     statusCode,
     message: "Validation Error.",
     errorSources,
     
    }
};

export default handleCastError;