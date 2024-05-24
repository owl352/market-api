import type { Express, Request, Response } from "express";
import { error as err } from "logger";
import { authModel } from "../../models";
import { validateParam } from "../../helpers/validate-param.helper";
import { keyLifeTime } from "../../helpers/constants.helper";
export function validateKeyEndpoint(app: Express) {
  app.post("/api/validateKey", async (req: Request, res: Response) => {
    try {
      if (validateParam(req.body.key)) {
        const token = await authModel.findOne({ key: req.body.key }).exec();
        if (token) {
          res.send(new Date().getTime() - token.date.getTime() < keyLifeTime);
        } else {
          res.send(false);
        }
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      res.sendStatus(500);
      err(error);
    }
  });
}
