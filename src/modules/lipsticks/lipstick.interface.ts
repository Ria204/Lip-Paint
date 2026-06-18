import { Types } from "mongoose";

export type TLipstick = {
  name: string,
  brand: string,
  description: string,
  price: string,
  discountPrice: string,
  shadeName: string,
  shadeCode: string,
  color: string,
  finish: "Matte" | "Glossy" | "Satin" | "Cream" | "Velvet",
  texture: "Liquid" | "Bullet" | "Crayon",
  stock: string,
  sold: string,
  isAvailable: boolean,
  isDeleted: boolean,
  seller: Types.ObjectId,
  createdAt: Date,
  updatedAt: Date,
};
