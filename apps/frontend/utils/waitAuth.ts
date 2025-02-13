import { User } from "firebase/auth";
import { auth } from "../api/auth";

export function waitForAuth(): Promise<User> {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error("User not authenticated"));
      }
      unsubscribe();
    });
  });
}
