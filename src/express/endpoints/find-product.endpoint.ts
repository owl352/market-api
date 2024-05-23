import type { Express, Request, Response } from "express";
import { error as err, log } from "logger";
import { findProduct } from "../../helpers/find-product.helper";
import mongoose from "mongoose";
import { userModel } from "../../models";
import { Roles } from "../../enums";
export function findProductEndpoint(app: Express) {
  app.post("/api/findProduct", async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const user = await userModel.findOne({ login: body.login });
      res.send(
        await findProduct({
          _id: body._id
            ? mongoose.Types.ObjectId.createFromHexString(body._id)
            : undefined,
          name: body.name,
          price: body.price ? parseInt(body.price) : undefined,
          inStock:
            body.inStock !== undefined ? body.inStock === "true" : undefined,
          isAvailable:
            user?.role == Roles.admin
              ? body.isAvailable !== undefined
                ? body.isAvailable === "true"
                : undefined
              : true,
          description: body.description,
          additions: body.additions,
        })
      );
    } catch (error) {
      res.sendStatus(500);
      err(error);
    }
  });
}
