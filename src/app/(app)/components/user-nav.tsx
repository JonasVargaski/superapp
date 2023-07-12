"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitialsFromName } from "@/utils/string";
import { LogOut, Settings, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function UserNav() {
  const { data } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={data?.user?.image ?? ""}
              alt={data?.user?.name ?? "user"}
            />
            <AvatarFallback>
              {getInitialsFromName(data?.user?.name!)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-0.5">
            <p className="text-sm truncate font-medium ">{data?.user?.name}</p>
            <p className="text-xs pr-1 truncate leading-none text-muted-foreground">
              {data?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex flex-col gap-1">
          <DropdownMenuItem asChild>
            <Link href="/user/profile">
              <User className="w-4 h-4 text-slate-600" />
              Meu perfil
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/user/settings">
              <Settings className="w-4 h-4 text-slate-600" />
              Configurações
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="w-full text-red-500 focus:text-red-600"
        >
          <button onClick={() => signOut()}>
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
