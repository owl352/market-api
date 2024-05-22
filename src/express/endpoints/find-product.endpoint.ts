import type { Express, Request, Response } from "express";
import { error as err, log } from "logger";
import { findProduct } from "../../helpers/find-product.helper";
import mongoose from "mongoose";
export function findProductEndpoint(app: Express) {
  app.post("/api/findProduct", async (req: Request, res: Response) => {
    try {
      const body = req.body;
      log(
        body.inStock !== undefined
          ? body.inStock === "true"
          : undefined + "\n" + body.inStock
      );
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
            body.isAvailable !== undefined
              ? body.isAvailable === "true"
              : undefined,
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
