import { getCurrentUser } from "@/lib/session";
import { TCheckRoles, checkRoles } from "@/utils/check-roles";
import { redirect } from "next/navigation";

type TRoleServerProps = Pick<TCheckRoles, "op" | "roles"> & {
  children: React.ReactNode;
  redirectUrl?: string;
  noAuth?: React.ReactNode;
};

export async function RoleServer({
  children,
  redirectUrl,
  noAuth,
  ...props
}: TRoleServerProps) {
  const user = await getCurrentUser();
  const hasPermission = checkRoles({
    userRoles: user?.roles,
    ...props,
  });

  if (hasPermission) return <>{children}</>;
  if (redirectUrl) return redirect(redirectUrl);
  if (noAuth) return <>{noAuth}</>;
  return null;
}
