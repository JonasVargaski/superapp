import { RoleClient } from "./client";
import { RoleServer } from "./server";

/**@description Component used to control the display of pages or private components that depend on specific roles of the logged in user. */
export const Role = {
  Server: RoleServer,
  Client: RoleClient,
};
