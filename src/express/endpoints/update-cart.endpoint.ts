import type { Express, Request, Response } from "express";
import { error as err } from "logger";
import { cartModel, productModel, userModel } from "../../models";
import { validateParam } from "../../helpers/validate-param.helper";
import { updateCart } from "../../helpers/update-cart.helper";
export function updateCartEndpoint(app: Express) {
  app.post("/api/updateCart", async (req: Request, res: Response) => {
    try {
      if (validateParam(req.body.id) && validateParam(req.body.count)) {
        const user = (await userModel
          .findOne({ login: req.body.login })
          .exec())!;
        const userCart = await cartModel.findOne({ userId: user._id }).exec();
        const product = await productModel.findById(req.body.id).exec();
        if (product?.isAvailable && product.inStock) {
          if (!userCart) {
            await cartModel.create({
              userId: user._id,
              items: [{ id: product._id, count: parseInt(req.body.count) }],
            });
            res.send("ok");
          } else {
            const status = await updateCart(
              userCart,
              req.body.id,
              req.body.count
            );
            if (status) {
              res.send("ok");
            } else {
              res.sendStatus(400);
            }
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
