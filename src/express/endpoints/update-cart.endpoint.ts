import type { Express, Request, Response } from "express";
import { error as err, log } from "logger";
import { getUser } from "../../helpers/get-user.helper";
import type { User } from "../../@types";
import { cartModel, productModel, userModel } from "../../models";
import { validateParam } from "../../helpers/validate-param.helper";
import mongoose from "mongoose";
export function updateCartEndpoint(app: Express) {
  app.post("/api/updateCart", async (req: Request, res: Response) => {
    try {
      if (validateParam(req.body.id) && validateParam(req.body.count)) {
        const user = (await userModel
          .findOne({ login: req.body.login })
          .exec())!;
        const userCart = await cartModel.findOne({ userId: user._id }).exec();
        const product = await productModel.findById(req.body.id).exec();
        log("stage 1");
        if (product?.isAvailable && product.inStock) {
          log("stage 2");
          if (!userCart) {
            log("stage 3");
            log(user._id);
            await cartModel.create({
              userId: user._id,
              items: [{ id: product._id, count: parseInt(req.body.count) }],
            });
            res.send("ok");
          } else {
            let haveThis: boolean = false;
            let newCart = userCart.items;
            for (let el of userCart.items) {
              if (el.id.toString() == req.body.id) {
                haveThis = true;
                if (req.body.count == "0") {
                  newCart = newCart.filter(
                    (_) => _ != el
                  ) as mongoose.Types.DocumentArray<{
                    id: mongoose.Types.ObjectId;
                    count: number;
                  }>;
                } else {
                  newCart[newCart.findIndex((_) => _ == el)].count = parseInt(
                    req.body.count
                  );
                }
                break;
              }
            }
            if (!haveThis) {
              if (req.body.count != 0) {
                newCart.push({
                  id: mongoose.Types.ObjectId.createFromHexString(req.body.id),
                  count: req.body.count,
                });
              } else {
                res.sendStatus(400);
              }
            }
            await cartModel.findByIdAndUpdate(userCart._id, { items: newCart });
            res.send("ok");
          }
        } else {
          res.send("not available or end of stock!");
        }
      } else {
        res.send(400);
      }
    } catch (error) {
      res.sendStatus(500);
      err(error);
    }
  });
}
