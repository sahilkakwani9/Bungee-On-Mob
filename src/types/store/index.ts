import { ChainInfo } from "../socket";
export type IConfigStore = {
  supportedChains: null | ChainInfo[];
  sendingChains: null | ChainInfo[];
  receivingChains: null | ChainInfo[];
  setSupportedChains: (chains: ChainInfo[]) => void;
  setSendingChains: (chains: ChainInfo[]) => void;
  setReceivingChains: (chains: ChainInfo[]) => void;
};
