interface TokenInfo {
  chainId: number;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  icon: string;
  logoURI: string;
  chainAgnosticId: string | null;
}

interface GasFees {
  gasAmount: string;
  gasLimit: number;
  asset: TokenInfo;
  feesInUsd: number;
}

interface Protocol {
  name: string;
  displayName: string;
  icon: string;
}

interface Step {
  type: string;
  protocol: Protocol;
  chainId: number;
  fromAsset: TokenInfo;
  fromAmount: string;
  toAsset: TokenInfo;
  toAmount: string;
  swapSlippage: number;
  minAmountOut: string;
  gasFees: GasFees;
}

interface UserTx {
  userTxType: string;
  txType: string;
  chainId: number;
  toAmount: string;
  toAsset: TokenInfo;
  stepCount: number;
  routePath: string;
  sender: string;
  approvalData: {
    minimumApprovalAmount: string;
    approvalTokenAddress: string;
    allowanceTarget: string;
    owner: string;
  };
  steps: Step[];
  gasFees: GasFees;
}

interface IntegratorFee {
  amount: string;
  asset: TokenInfo;
}

interface BridgeRouteError {
  status: string;
  maxAmount?: string;
}

interface Route {
  routeId: string;
  isOnlySwapRoute: boolean;
  fromAmount: string;
  toAmount: string;
  usedBridgeNames: string[];
  minimumGasBalances: Record<string, string>;
  chainGasBalances: Record<
    string,
    { minGasBalance: string; hasGasBalance: boolean }
  >;
  totalUserTx: number;
  sender: string;
  recipient: string;
  totalGasFeesInUsd: number;
  receivedValueInUsd: number;
  inputValueInUsd: number;
  outputValueInUsd: number;
  userTxs: UserTx[];
  serviceTime: number;
  maxServiceTime: number;
  integratorFee: IntegratorFee;
  extraData: Record<string, any>;
}

interface Result {
  routes: Route[];
  socketRoute: null;
  destinationCallData: Record<string, any>;
  fromChainId: number;
  fromAsset: TokenInfo;
  toChainId: number;
  toAsset: TokenInfo;
  bridgeRouteErrors: Record<string, BridgeRouteError>;
}

interface RouteResponse {
  success: boolean;
  result: Result;
}

export { type RouteResponse, type Result, type Route };
