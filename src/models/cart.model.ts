import mongoose from "mongoose";
import { cartSchema } from "../schemas";

export const cartModel = mongoose.model("carts", cartSchema);
