import type { Express } from "express";
import { registerEndpoint } from "./register.endpoint";
import { getRolesEndpoint } from "./get-roles.endpoint";
import { authEndpoint } from "./auth.endpoint";
import { getUserEndpoint } from "./get-user.endpoint";
import { validateLoginEndpoint } from "./validate-login.endpoint";
import { giveRoleEndpoint } from "./give-role.endpoint";
import { BanEndpoint } from "./ban.endpoint";
import { UnBanEndpoint } from "./unban.endpoint";
import { createProductEndpoint } from "./create-product.endpoint";
import { findProductEndpoint } from "./find-product.endpoint";
import { updateProductEndpoint } from "./update-product.endpoint";
import { deleteProductEndpoint } from "./delete-product.endpoint";

export function initEndPoints(app: Express) {
  registerEndpoint(app);
  getRolesEndpoint(app);
  authEndpoint(app);
  getUserEndpoint(app);
  validateLoginEndpoint(app);
  giveRoleEndpoint(app);
  BanEndpoint(app);
  UnBanEndpoint(app);
  createProductEndpoint(app);
  findProductEndpoint(app);
  updateProductEndpoint(app);
  deleteProductEndpoint(app);
}
