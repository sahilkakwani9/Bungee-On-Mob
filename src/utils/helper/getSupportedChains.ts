import { SOCKET_API_URL } from "../constants";
import { SOCKET_API_KEY } from "../secret";

async function getSupportedTokens() {
  try {
    const response = await fetch(`${SOCKET_API_URL}/supported/chains`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "API-KEY": SOCKET_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Cant fetch supported tokens, HTTP error! Status: ${response.status}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export default getSupportedTokens;
