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

//View single lipstick by both seller and purchaser
const viewSingleLipstick = catchAsync(async(req,res)=>{
    const result = await lipstickService.viewSingleLipstick(req.body, req.params.id);
   
    sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "Lipstick data retrieved successfully",
        data : result
    })
});

//View all list of lipsticks by both seller and purchaser
const viewAllLipstick = catchAsync(async(req,res)=>{
    const result = await lipstickService.viewAllLipstick(req.body);
   
    sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "All list of lipsticks retrieved successfully",
        data : result
    })
});




export const lipstickController = {
    addLipstick,
    viewSingleLipstick,
    viewAllLipstick
};