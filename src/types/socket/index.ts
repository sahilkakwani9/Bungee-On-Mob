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

interface TokenInfo {
  name: string;
  address: string;
  icon: string | null;
  decimals: number;
  symbol: string;
  chainId: number;
  logoURI: string | null;
  chainAgnosticId: string | null;
}

interface TokenResult {
  success: boolean;
  result: TokenInfo[];
}

enum sortCriteria {
  OUTPUT = "output",
  TIME = "time",
  GAS = "gas",
}

interface checkAllowanceResult {
  success: true;
  result: {
    value: string;
    tokenAddress: string;
  };
}

export {
  type ChainInfo,
  type SupportedChainResult,
  type TokenResult,
  type TokenInfo,
  type checkAllowanceResult,
  sortCriteria,
};
