import { useConfigStore } from "../../store/ConfigStore";
import { TokenInfo } from "../../types/socket";
import { IConfigStore } from "../../types/store";
import { MOST_VALUED_TOKENS } from "../constants";
import getFromChainTokens from "./getFromChainTokens";
import getToChainTokens from "./getToChainTokens";

interface ITokenConfig {
  setSendingTokens: (tokens: TokenInfo[]) => void;
  setReceivingTokens: (tokens: TokenInfo[]) => void;
  setSelectedSendingToken: (chain: TokenInfo) => void;
  setSelectedReceivingToken: (chain: TokenInfo) => void;
  setTokensLoading: (value: boolean) => void;
}

const fetchTokenLists = async (
  fromChain: number,
  toChain: number,
  configStore: ITokenConfig
) => {
  const {
    setTokensLoading,
    setSendingTokens,
    setReceivingTokens,
    setSelectedSendingToken,
    setSelectedReceivingToken,
  } = configStore;
  try {
    setTokensLoading(true);
    const fromTokens = await getFromChainTokens(fromChain, toChain);
    const toTokens = await getToChainTokens(fromChain, toChain);
    const filteredFromTokens = fromTokens.result.filter((tokenInfo) =>
      MOST_VALUED_TOKENS.includes(tokenInfo.name)
    );
    const filteredToTokens = toTokens.result.filter((tokenInfo) =>
      MOST_VALUED_TOKENS.includes(tokenInfo.name)
    );
    setSendingTokens(filteredFromTokens.reverse());
    setReceivingTokens(filteredToTokens.reverse());
    setSelectedSendingToken(filteredFromTokens[0]);
    setSelectedReceivingToken(filteredToTokens[0]);
    setTokensLoading(false);
    console.log(fromTokens.result.length);
  } catch (error) {
    throw new Error(`Cant fetch supported tokens, error: ${error}`);
  }
};

export default fetchTokenLists;
