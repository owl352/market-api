import type { Express, Request, Response } from "express";
import { userModel } from "../../models";
import { error as err, log } from "logger";
import { validateParam } from "../../helpers/validate-param.helper";
export function registerEndpoint(app: Express) {
  app.post("/api/register", async (req: Request, res: Response) => {
    try {
      const body = req.body;
      if (
        validateParam(body.login) &&
        validateParam(body.pass) &&
        validateParam(body.username)
      ) {
        const check = await userModel.findOne({ login: body.login }).exec();
        if (check == null || check == undefined) {
          const hash = await Bun.password.hash(body.pass);
          await userModel.create({
            login: body.login,
            passHash: hash,
            username: body.username,
            role: 0,
            banned: false,
            history: [],
            actualDeliveries: [],
            transactions: [],
            actualTransactions: [],
          });
          res.send("ok");
        } else {
          res.sendStatus(405);
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
