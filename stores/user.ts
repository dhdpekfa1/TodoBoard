import { atom } from "jotai";
import { User } from "@/app/types/user";

export const userAtom = atom<User | null>(null);
