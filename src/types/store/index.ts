import { ChainInfo } from "../socket";
export type IConfigStore = {
  supportedChains: null | ChainInfo[];
  sendingChains: null | ChainInfo[];
  receivingChains: null | ChainInfo[];
  selectedSendingChain: ChainInfo | null;
  selectedReceivingChain: ChainInfo | null;
  setSupportedChains: (chains: ChainInfo[]) => void;
  setSendingChains: (chains: ChainInfo[]) => void;
  setReceivingChains: (chains: ChainInfo[]) => void;
  setSelectedSendingChain: (chain: ChainInfo) => void;
  setSelectedReceivingChain: (chain: ChainInfo) => void;
};
