import type { Express, Request, Response } from "express";
import { Roles } from "../../enums";
import { error as err } from "logger";
import { validateParam } from "../../helpers/validate-param.helper";
export function getRolesEndpoint(app: Express) {
  app.post("/api/getRole", async (req: Request, res: Response) => {
    try {
      if (validateParam(req.body.id)) {
        res.send(Roles[req.body.id]);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      res.sendStatus(500);
      err(error);
    }
  });
}
