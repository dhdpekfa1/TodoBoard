"use client";

import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { createClient } from "@/lib/supabase/client";
import { BadgeCheck, ChevronsUpDown, LogOut } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  EditProfileDialog,
} from "@/components/ui";

import { User } from "@/app/types/user";

const NavUser = ({ user }: { user: User | null }) => {
  const supabase = createClient();

  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "로그아웃 실패",
        description: "로그아웃에 실패했습니다. 다시 시도해주세요.",
      });
    }

    // 로그아웃 성공 시 store 초기화
    localStorage.removeItem("user");
    localStorage.removeItem("page_list");
    document.cookie = `user=; path=/; max-age=0`; // 쿠키 삭제
    toast({
      title: "로그아웃 완료",
      description: "일정 관리 앱을 사용해주셔서 감사합니다.",
    });
    router.replace("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          className="py-6 px-3 flex items-center justify-evenly"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage
              src={"https://github.com/shadcn.png"}
              alt={"user img"}
            />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user?.nickname}</span>
            <span className="truncate text-xs">{user?.email}</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side="right"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage
                src={"https://github.com/shadcn.png"}
                alt={"user img"}
              />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Ollin</span>
              <span className="truncate text-xs">{user?.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <EditProfileDialog>
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault();
              }}
            >
              <BadgeCheck />
              Account
            </DropdownMenuItem>
          </EditProfileDialog>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavUser;
