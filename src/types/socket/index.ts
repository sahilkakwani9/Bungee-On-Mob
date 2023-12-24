interface ChainInfo {
  chainId: number;
  name: string;
  isL1: boolean;
  sendingEnabled: boolean;
  icon: string;
  receivingEnabled: boolean;
  refuel: {
    sendingEnabled: boolean;
    receivingEnabled: boolean;
  };
  currency: {
    address: string;
    icon: string;
    name: string;
    symbol: string;
    decimals: number;
    minNativeCurrencyForGas: string;
  };
  rpcs: string[];
  explorers: string[];
}

interface SupportedChainResult {
  success: boolean;
  result: ChainInfo[];
}

export { type ChainInfo, type SupportedChainResult };
