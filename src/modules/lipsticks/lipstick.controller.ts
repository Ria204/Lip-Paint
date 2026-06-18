import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { lipstickService } from "./lipstick.service";


//Add product lipstick by the seller
const addLipstick = catchAsync(async(req,res)=>{
    const result = await lipstickService.addLipstick(req.body, req.user.userID);

    sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "Lipstick added successfully",
        data : result
    })
});


export const lipstickController = {
    addLipstick
};