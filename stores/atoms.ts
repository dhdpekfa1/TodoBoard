import { atom } from "jotai";
import { BoardDataType, PageDataType } from "@/app/types/board";

/** Supabase 'pages' 테이블 내부 모든 데이터 조회 */
// 전체 Page 목록 조회
export const pagesAtom = atom<PageDataType[]>([]);

// 단일 Page
export const pageAtom = atom<PageDataType | null>(null);

// 전체 board 목록 조회
export const boardsAtom = atom<BoardDataType[]>([]);

// // 단일 board
export const boardAtom = atom<BoardDataType | null>(null);
