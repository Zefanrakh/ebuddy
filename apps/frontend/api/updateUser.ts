import { User } from "@repo/shared-types";
import { waitForAuth } from "../utils/waitAuth";
import { UserDto } from "../types/UserDto";

export async function upsertUser(users: UserDto[]) {
  try {
    const user = await waitForAuth();
    const { token } = await user.getIdTokenResult();
    if (!token) {
      throw new Error("User not authenticated");
    }

    const res = await fetch(
      `http://127.0.0.1:5001/ebuddy-7cedc/us-central1/api/update-user-data/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          users,
        }),
      }
    );
    const responseData = await res.json();

    if (!res.ok) Error(responseData.error || "Failed to update user");
    return responseData;
  } catch (error) {
    console.error("Error update user:", (error as Error).message);
    throw error;
  }
}
