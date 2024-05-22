import type { Express, Request, Response } from "express";
import { error as err } from "logger";
import { getUser } from "../../helpers/get-user.helper";
import type { User } from "../../@types";
import { Roles } from "../../enums";
import { userModel } from "../../models";
import { validateParam } from "../../helpers/validate-param.helper";
export function giveRoleEndpoint(app: Express) {
  app.post("/api/giveRole", async (req: Request, res: Response) => {
    try {
      if (validateParam(req.body.user) && validateParam(req.body.role)) {
        const user: User = (await getUser(req.body.login))!;
        if (user.role == Roles.admin) {
          await userModel
            .updateOne({ login: req.body.user }, { role: req.body.role })
            .exec();
          res.send("ok");
        } else {
          res.send(403);
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
