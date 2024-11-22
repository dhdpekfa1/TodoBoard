import { supabase } from "@/lib/supabase/client";

export const signInWithKakao = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_SUPABASE_URL
          ? `https://${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/callback`
          : "http://localhost:3000/auth/callback",
      },
    });

    if (error) {
      console.error("Error during Kakao login:", error);
      return { error };
    }

    console.log("Kakao login success:", data);

    return data;
  } catch (err) {
    console.error("Unexpected error in signInWithKakao:", err);
    return {
      error: { message: "로그인 처리 중 예상치 못한 오류가 발생했습니다." },
    };
  }
};
