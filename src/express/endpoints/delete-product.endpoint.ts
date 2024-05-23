import type { Express, Request, Response } from "express";
import { error as err, log } from "logger";
import mongoose from "mongoose";
import { productModel, userModel } from "../../models";
import { Roles } from "../../enums";
import { validateParam } from "../../helpers/validate-param.helper";
export function deleteProductEndpoint(app: Express) {
  app.post("/api/deleteProduct", async (req: Request, res: Response) => {
    try {
      const body = req.body;
      if (validateParam(body._id)) {
        const user = await userModel.findOne({ login: body.login }).exec();
        if (user!.role === Roles.admin) {
        await productModel.findByIdAndDelete(
            mongoose.Types.ObjectId.createFromHexString(body._id)
          );
          res.send("ok");
        } else {
          res.sendStatus(401);
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      res.sendStatus(500);
      err(error);
    }
  });
}
