import { CreateUserDto, ReadUserDto } from "@repo/shared-types";
import { waitForAuth } from "../utils/waitAuth";

export async function createUser(user: CreateUserDto) {
  try {
    const user = await waitForAuth();
    const { token } = await user.getIdTokenResult();
    if (!token) {
      throw new Error("User not authenticated");
    }

    const res = await fetch(
      `http://127.0.0.1:5001/ebuddy-7cedc/us-central1/api/create-user-data/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user,
        }),
      }
    );
    const responseData = await res.json();

    if (!res.ok) Error(responseData.error || "Failed to create user");
    return responseData;
  } catch (error) {
    console.error("Error create user:", (error as Error).message);
    throw error;
  }
}
