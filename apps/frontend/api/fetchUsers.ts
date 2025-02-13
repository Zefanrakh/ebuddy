import { waitForAuth } from "../utils/waitAuth";

export async function fetchUsers() {
  try {
    const user = await waitForAuth();
    const { token } = await user.getIdTokenResult();
    if (!token) {
      throw new Error("User not authenticated");
    }

    const res = await fetch(
      "http://127.0.0.1:5001/ebuddy-7cedc/us-central1/api/fetch-users",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );
    const responseData = await res.json();

    if (!res.ok) {
      throw new Error(responseData.error || "Failed to fetch users");
    }

    return responseData;
  } catch (error) {
    console.error("Error fetching users:", (error as Error).message);
    throw error;
  }
}
