import { User } from "../user";

export interface ReadUserDto extends Omit<Partial<User>, "recentlyActive"> {
  recentlyActive: string;
}
