import { ZodError, ZodIssue } from "zod";
import { TErrorSourse, TGenericErrorResponse } from "../interface/error.js";

const handleZodError = (err: ZodError): TGenericErrorResponse => {
    const errorSources:TErrorSourse = err.issues.map((issue: ZodIssue) => {
        return{
            path: issue?.path[issue.path.length -1] as string | number,
            message: issue?.message
        }
    }) 
   const statusCode = 400;

   return{
    statusCode,
    message: "Zod Validation Error.",
    errorSources,
    
   }
}

export default handleZodError