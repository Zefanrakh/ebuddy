import { User } from "@repo/shared-types";

export interface UserDto extends Omit<User, "recentlyActive"> {
  recentlyActive: string;
}
