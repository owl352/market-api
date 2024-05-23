import mongoose from "mongoose";
import type { IProductUpdate } from "../interfaces";
import { productModel } from "../models";

export async function updateProduct(body: IProductUpdate) {
  const normalFilter = {
    price: body.price,
    inStock: body.inStock,
    isAvailable: body.isAvailable,
    name: body.name,
    description: body.description,
    additions: body.additions,
    images: body.images
      ? JSON.parse(body.images).length != undefined
        ? JSON.parse(body.images)
        : undefined
      : undefined,
    previewImg: body.previewImg
      ? JSON.parse(body.previewImg).length != undefined
        ? JSON.parse(body.previewImg)
        : undefined
      : undefined,
  };
  const filtersWithoutUndefined = Object.fromEntries(
    Object.entries(normalFilter).filter(([_, v]) => v !== undefined)
  );
  await productModel.updateOne(
    { _id: mongoose.Types.ObjectId.createFromHexString(body._id) },
    filtersWithoutUndefined
  );
}
