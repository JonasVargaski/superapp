import Link from "next/link";
import { headers } from "next/headers";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types/roles";
import { getCurrentUser } from "@/lib/session";
import { checkRoles } from "@/utils/check-roles";

type NavItem = {
  label: string;
  path: string;
  roles: UserRole[];
};

const navItems: NavItem[] = [
  { label: "Home", path: "/", roles: [] },
  { label: "Serviços", path: "/services", roles: [] },
  { label: "Sobre", path: "/about", roles: [] },
  { label: "Contato", path: "/contat", roles: [] },
];

export async function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const headersList = headers();
  const activePath = headersList.get("x-invoke-path");
  const user = await getCurrentUser();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {navItems
        .filter(({ roles }) => checkRoles({ userRoles: user?.roles, roles }))
        .map((nav) => (
          <Link
            key={nav.label}
            href={nav.path}
            className={cn(
              "text-sm font-medium transition-colors hover:text-foreground/80",
              activePath?.startsWith(nav.path)
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            {nav.label}
          </Link>
        ))}
    </nav>
  );
}
