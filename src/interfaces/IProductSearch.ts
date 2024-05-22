import type { mongo } from "mongoose";

export type IProductSearch = {
  _id: mongo.BSON.ObjectId | undefined;
  name: string | undefined;
  price: number | undefined;
  inStock: boolean | undefined;
  isAvailable: boolean | undefined;
  description: string | undefined;
  additions: string | undefined;
};
