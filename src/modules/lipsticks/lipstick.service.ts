import { lipstickModel } from "./lipstick.model";
import { TLipstick } from "./lipstick.interface";
import AppError from "../../app/errors/AppError";
import httpStatus from "http-status";
import { TLogin } from "../auth/auth.interface";
import { User } from "../auth/auth.model";


//Add product lipstick by the seller
const addLipstick = async(payload : Partial<TLipstick>, sellerId : string)=>{
    const lipstick = await lipstickModel.findOne({name : payload.name});

    if(lipstick){
        throw new AppError(httpStatus.BAD_REQUEST, "Lipstick with this name already exists")
    };

    (payload as any).seller = sellerId;

    const result = await lipstickModel.create(payload);

    return result
};

//View single lipstick by both seller and purchaser
const viewSingleLipstick = async(payload : TLogin, lipstickId : any)=>{
    const user = await User.findOne({email : payload.email});

    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, "User does not exist")
    };

    const lipstick = await lipstickModel.findById(lipstickId);

    if(!lipstick){
        throw new AppError(httpStatus.NOT_FOUND, "Lipstick not found")
    };


    return lipstick
}; 

//View all list of lipsticks by both seller and purchaser
const viewAllLipstick = async (payload : TLogin)=>{
    const user = await User.findOne({email : payload.email});

    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, "User does not exist")
    };   

    const lipstick = await lipstickModel.find();

    return lipstick;
}; 


export const lipstickService = {
    addLipstick,
    viewSingleLipstick,
    viewAllLipstick,
};