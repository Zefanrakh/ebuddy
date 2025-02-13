import { User } from "../user";

export interface CreateUserDto
  extends Omit<Partial<User>, "recentlyActive" | "id" | "score"> {
  recentlyActive?: string;
}
