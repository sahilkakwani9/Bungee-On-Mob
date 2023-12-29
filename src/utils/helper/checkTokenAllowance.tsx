import { TokenResult, checkAllowanceResult } from "../../types/socket";
import { SOCKET_API_URL } from "../constants";
import { SOCKET_API_KEY } from "../secret";

async function checkTokenAllowance(
  chainId: number,
  ownerAddress: string,
  allowanceTarget: string,
  tokenAddress: string
): Promise<checkAllowanceResult> {
  try {
    const response = await fetch(
      `${SOCKET_API_URL}/approval/check-allowance?chainID=${chainId}&owner=${ownerAddress}&allowanceTarget=${allowanceTarget}&tokenAddress=${tokenAddress}`,
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
        `Cant check allowance, HTTP error! Status: ${response.status}`
      );
    }

    const data: checkAllowanceResult = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export default checkTokenAllowance;
