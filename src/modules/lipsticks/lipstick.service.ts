import { lipstickModel } from "./lipstick.model";
import { TLipstick } from "./lipstick.interface";
import AppError from "../../app/errors/AppError";
import httpStatus from "http-status";



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


export const lipstickService = {
    addLipstick
};