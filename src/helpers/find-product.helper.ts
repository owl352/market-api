import { log } from "logger";
import type { IProductSearch } from "../interfaces";
import { productModel } from "../models";

// TODO: implement product type
export async function findProduct(filters: IProductSearch): Promise<any> {
  const normalFilter = {
    _id: filters._id,
    price: filters.price,
    inStock: filters.inStock,
    isAvailable: filters.isAvailable,
    name: filters.name ? { $regex: filters.name } : undefined,
    description: filters.description
      ? { $regex: filters.description }
      : undefined,
    additions: filters.additions ? { $regex: filters.additions } : undefined,
  };
  const filtersWithoutUndefined = Object.fromEntries(
    Object.entries(normalFilter).filter(([_, v]) => v !== undefined)
  );
  if (filtersWithoutUndefined._id !== undefined) {
    return await productModel.findById(filters._id).exec();
  } else {
    log(filtersWithoutUndefined);
    return await productModel.find(filtersWithoutUndefined).exec();
  }
}
