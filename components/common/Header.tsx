"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ButtonFill } from "../ui";
import { signInWithKakao } from "@/app/api/auth";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  // const currentPath = router.pathname;

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <header className="page__header">
      {/* 로고 */}
      <div className="flex items-center gap-2">
        <img src="images/logo.png" alt="logo img" className="w-10 h-10" />
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight color-[#222]">
          Todo Board
        </h2>
      </div>

      {/* 로그인 또는 로그아웃 버튼 */}
      <div>
        {isLoggedIn ? (
          <ButtonFill onClick={handleLogout}>로그아웃</ButtonFill>
        ) : (
          <ButtonFill onClick={handleLogin}>로그인</ButtonFill>
        )}
      </div>
    </header>
  );
};

export { Header };
