"use client";

import { ButtonOutline } from "@/components/ui";
import React, { useState } from "react";
import { signInWithKakao } from "../api/auth";

const LoginPag = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleKakaoSignin = async () => {
    setLoading(true);
    setErrorMessage("");

    const res = await signInWithKakao();

    if (!res) console.log(res);

    setLoading(false);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-10 mt-10 text-[#222]">
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
        Login
      </h2>
      <div>
        <ButtonOutline onClick={handleKakaoSignin}>
          {loading ? "로딩 중..." : "카카오로그인"}
        </ButtonOutline>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default LoginPag;
