import { SupportedChainResult } from "../../types/socket";
import { SOCKET_API_URL } from "../constants";
import { SOCKET_API_KEY } from "../secret";

async function getSupportedChains(): Promise<SupportedChainResult> {
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
        `Cant fetch supported chains, HTTP error! Status: ${response.status}`
      );
    }

    const data: SupportedChainResult = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export default getSupportedChains;
