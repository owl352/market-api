import type { Express, Request, Response } from "express";
import { productModel, userModel } from "../../models";
import { error as err, log } from "logger";
import { Roles } from "../../enums";
import { validateParam } from "../../helpers/validate-param.helper";
export function createProductEndpoint(app: Express) {
  app.post("/api/createProduct", async (req: Request, res: Response) => {
    try {
      const body = req.body;
      if (
        validateParam(body.name) &&
        validateParam(body.price) &&
        validateParam(body.description)
      ) {
        const user = await userModel.findOne({ login: body.login }).exec();
        if (user?.role == Roles.admin) {
          await productModel.create({
            name: body.name,
            price: parseInt(body.price),
            description: body.description,
            images:
              (body.images
                ? JSON.parse(body.images).length != undefined
                  ? JSON.parse(body.images)
                  : undefined
                : undefined) ?? [],
            inStock: true,
            isAvailable: false,
            previewImg:
              (body.previewImg
                ? JSON.parse(body.previewImg).length != undefined
                  ? JSON.parse(body.previewImg)
                  : undefined
                : undefined) ?? [],
            additions: body.additions ?? "",
          });
          res.send("ok");
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      err(error);
      res.sendStatus(500);
    }
  });
}
