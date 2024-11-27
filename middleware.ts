import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/client";

export async function middleware(request: NextRequest) {
  const supabase = createClient();
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // 쿠키에서 로그인 사용자 정보 가져오기
  const userCookie = request.cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;
  console.log("User Cookie:", user);

  // // 로그인 상태에서 로그인 페이지에 접근 차단
  if (user && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/board", request.url));
  }

  // 비로그인 상태에서 보호된 경로 접근 차단
  if (!user && pathname.startsWith("/board")) {
    return NextResponse.redirect(new URL("/", request.url)); // 로그인 페이지로 리다이렉트
  }

  // 보호된 경로에 대한 접근 권한 확인
  if (pathname.startsWith("/board/") || pathname.startsWith("/pages/")) {
    // URL에서 페이지 ID 추출
    const pageId = pathname.split("/")[2];

    if (!pageId) {
      // 페이지 ID가 없는 경우 404 페이지로 리다이렉트
      url.pathname = "/404";
      return NextResponse.redirect(url);
    }

    // Supabase에서 페이지 정보 확인
    const { data: page, error } = await supabase
      .from("pages")
      .select("id, user_uid")
      .eq("id", pageId)
      .single();

    if (error || !page) {
      // 페이지가 없거나 조회 실패 시 404 페이지로 리다이렉트
      url.pathname = "/404";
      return NextResponse.redirect(url);
    }

    // 페이지의 소유자와 로그인한 사용자(user.id) 비교
    if (page.user_uid !== user?.id) {
      // 페이지 소유자가 아닌 경우 403 페이지로 리다이렉트
      url.pathname = "/403";
      return NextResponse.redirect(url);
    }
  }

  // 모든 조건을 통과하면 요청 진행
  return NextResponse.next();
}

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: ["/board/:path*", "/pages/:path*"], // 보호할 경로 설정
};
