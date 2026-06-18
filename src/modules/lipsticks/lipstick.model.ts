import { model, Schema } from "mongoose";
import { TLipstick } from "./lipstick.interface";

const lipstickSchema = new Schema<TLipstick>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
      unique : true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxLength: 200,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    discountPrice: {
      type: String,
      required: true,
      trim: true,
    },
    shadeName: {
      type: String,
      required: true,
      trim: true,
    },
    shadeCode: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    finish: {
      type: String,
      enum: ["Matte", "Glossy", "Satin", "Cream", "Velvet"],
      default: "Matte",
    },
    texture: {
      type: String,
      enum: ["Liquid", "Bullet", "Crayon"],
      default: "Liquid",
    },
    stock: {
      type: String,
      required: true,
    },
    sold: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const lipstickModel = model<TLipstick>("lipsticks", lipstickSchema);
