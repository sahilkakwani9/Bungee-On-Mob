import { TokenResult, sortCriteria } from "../../types/socket";
import { RouteResponse } from "../../types/socket/route";
import { SOCKET_API_URL } from "../constants";
import { SOCKET_API_KEY } from "../secret";

async function getRoutes(
  fromChainId: number,
  fromTokenAddress: string,
  toChainId: number,
  toTokenAddress: string,
  amount: string,
  userAddress: string,
  sortCriteria: sortCriteria
): Promise<RouteResponse> {
  try {
    console.log(
      fromChainId,
      ":",
      fromTokenAddress,
      ":",
      toChainId,
      ":",
      toTokenAddress,
      ":",
      amount,
      ":",
      userAddress,
      ":",
      sortCriteria
    );

    const response = await fetch(
      `${SOCKET_API_URL}/quote?fromChainId=${fromChainId}&fromTokenAddress=${fromTokenAddress}&toChainId=${toChainId}&toTokenAddress=${toTokenAddress}&fromAmount=${amount}&userAddress=${userAddress}&uniqueRoutesPerBridge=true&sort=${sortCriteria}&singleTxOnly=true`,
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
        `Cant fetch supported routes, HTTP error! Status: ${response.status}`
      );
    }

    const data: RouteResponse = await response.json();
    console.log("got the routes", data);

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export default getRoutes;
