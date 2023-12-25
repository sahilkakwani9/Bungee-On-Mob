import { TokenResult } from "../../types/socket";
import { SOCKET_API_URL } from "../constants";
import { SOCKET_API_KEY } from "../secret";

async function getToChainTokens(
  fromChainId: number,
  toChainId: number
): Promise<TokenResult> {
  try {
    const response = await fetch(
      `${SOCKET_API_URL}/token-lists/to-token-list?fromChainId=${fromChainId}&toChainId=${toChainId}&singleTxOnly=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "API-KEY": SOCKET_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Cant fetch supported tokens, HTTP error! Status: ${response.status}`
      );
    }

    const data: TokenResult = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export default getToChainTokens;
