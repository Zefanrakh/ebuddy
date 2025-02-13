import { User } from "../user";

export interface UpdateUserDto
  extends Omit<Partial<User>, "recentlyActive" | "id"> {
  id: string;
  recentlyActive: string;
}
