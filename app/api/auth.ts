import { createClient } from "@/lib/supabase/client";

// TODO: 카카오 로그인 안되는 이슈 확인 필요
export const signInWithKakao = async () => {
  const supabase = createClient();
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
