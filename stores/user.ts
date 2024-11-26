import { atomWithStorage } from "jotai/utils";
import { User } from "@/app/types/user";

export const userAtom = atomWithStorage<User | null>("user", null);
