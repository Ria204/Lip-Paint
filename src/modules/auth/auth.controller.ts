import config from "../../app/config/config";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { userService } from "./auth.service";

//Signup
const signup = catchAsync(async(req,res)=>{
    const result = await userService.signup(req.body);

    sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "User created successfully",
        data : result
    })
}); 

//Login
const login = catchAsync(async(req,res)=>{
    const result = await userService.login(req.body);

    //Saving refresh token in cookies so that refreshToken API works
    const refreshToken = result.refreshToken;

    res.cookie("refreshToken", refreshToken, {
        secure : config.node_env === "production",
        httpOnly : true
    });

    sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "User logged in successfully",
        data : result
    })
});

//Refresh Token 
const refreshToken = catchAsync(async (req,res)=>{
    const result = await userService.refreshToken(req.cookies.refreshToken);

    sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "New access token generated successfully",
        data : result
    })
});

//Forgot Password
const forgotPassword = catchAsync(async(req,res)=>{
    const result = await userService.forgotPassword(req.body.email);

    sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "Password reset mail sent successfully",
        data : result
    })
});

//Reset Password
const resetPassword = catchAsync(async(req,res)=>{
    const result = await userService.resetPassword(req.headers.authorization as string, req.body);

    sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "Password reset successfully",
        data : result
    })
});

//Change Password
const changePassword = catchAsync(async(req,res)=>{
    const result = await userService.changePassword(req.body, req.headers.authorization as string);

    sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "Password changed successfully",
        data : result
    })
});




export const userController = {
    signup,
    login,
    refreshToken,
    forgotPassword,
    resetPassword,
    changePassword
};