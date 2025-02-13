import { User } from "@repo/shared-types";

export interface CreateUserDto
  extends Omit<Partial<User>, "recentlyActive" | "id"> {
  recentlyActive: string;
}
