"use client";

import { TCheckRoles, checkRoles } from "@/utils/check-roles";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type TRoleClientProps = Pick<TCheckRoles, "op" | "roles"> & {
  children: React.ReactNode;
  redirectUrl?: string;
  fallback?: React.ReactNode;
  noAuth?: React.ReactNode;
};

type PermissionStatus = "loading" | "redirecting" | "granted" | "refused";

export function RoleClient({
  children,
  redirectUrl,
  fallback,
  noAuth,
  ...props
}: TRoleClientProps) {
  const router = useRouter();
  const { data, status } = useSession();
  const [permission, setPermission] = useState<PermissionStatus>(
    () => "loading"
  );

  useEffect(() => {
    async function handle() {
      const hasPermission = checkRoles({
        userRoles: data?.user?.roles,
        ...props,
      });

      if (hasPermission) return setPermission(() => "granted");
      if (redirectUrl) {
        setPermission(() => "redirecting");
        return await router.replace(redirectUrl);
      }
      return setPermission(() => "refused");
    }
    if (status !== "loading" && permission === "loading") handle();
  }, [
    data?.user,
    fallback,
    noAuth,
    permission,
    props,
    redirectUrl,
    router,
    status,
  ]);

  if (permission === "granted") return <>{children}</>;
  if (permission === "loading") return <>{fallback}</>;
  if (permission === "refused") return <>{noAuth}</>;
  return null;
}
