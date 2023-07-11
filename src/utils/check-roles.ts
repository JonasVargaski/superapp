import { UserRole } from "@/types/roles";

type TCheckRoles = {
  userRoles?: Partial<Record<UserRole, boolean>>;
  roles: UserRole[];
  op?: "OR" | "AND";
};

function checkRoles({ userRoles, roles, op = "AND" }: TCheckRoles) {
  if (!roles?.length) return true;
  if (!userRoles || !Object.keys(userRoles).length) return false;

  return op === "AND"
    ? roles.every((key) => userRoles[key])
    : roles.some((key) => userRoles[key]);
}

export { checkRoles, type TCheckRoles };
