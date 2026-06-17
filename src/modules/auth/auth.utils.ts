import jwt from "jsonwebtoken";

export const createToken = (jwtPayload : {email : string, role : string, userID : string}, secret : any , expiresIn : any)=>{
    return jwt.sign(jwtPayload, secret, {expiresIn})
};


