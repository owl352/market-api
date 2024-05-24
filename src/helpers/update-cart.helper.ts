import mongoose from "mongoose";
import { cartModel } from "../models";

export async function updateCart(
  userCart: any,
  id: string,
  count: string
): Promise<boolean> {
  let haveThis: boolean = false;
  let newCart = userCart.items;
  for (let el of userCart.items) {
    if (el.id.toString() == id) {
      haveThis = true;
      if (count == "0") {
        newCart = newCart.filter(
          (_: any) => _ != el
        ) as mongoose.Types.DocumentArray<{
          id: mongoose.Types.ObjectId;
          count: number;
        }>;
      } else {
        newCart[newCart.findIndex((_: any) => _ == el)].count = parseInt(count);
      }
      break;
    }
  }
  if (!haveThis) {
    if (count != "0") {
      newCart.push({
        id: mongoose.Types.ObjectId.createFromHexString(id),
        count: parseInt(count),
      });
    } else {
      return false;
    }
  }
  await cartModel.findByIdAndUpdate(userCart._id, { items: newCart });
  return true;
}
