import { User } from "@repo/shared-types";

export interface UpdateUserDto
  extends Omit<Partial<User>, "recentlyActive" | "id"> {
  id: string;
  recentlyActive: string;
}
