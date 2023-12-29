import { TokenInfo } from ".";

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

interface SameChainUserTx {
  userTxType: string;
  txType: string;
  swapSlippage: number;
  chainId: number;
  protocol: {
    name: string;
    displayName: string;
    icon: string;
  };
  fromAsset: TokenInfo;
  approvalData: null | {
    minimumApprovalAmount: string;
    approvalTokenAddress: string;
    allowanceTarget: string;
    owner: string;
  };
  fromAmount: string;
  toAsset: TokenInfo;
  toAmount: string;
  minAmountOut: string;
  gasFees: GasFees;
  sender: string;
  recipient: string;
  userTxIndex: number;
}

interface CrossChainUserTx {
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

interface CrossChainRoute {
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
  userTxs: CrossChainUserTx[];
  serviceTime: number;
  maxServiceTime: number;
  integratorFee: IntegratorFee;
  extraData: Record<string, any>;
}

interface SameChainRoute {
  routeId: string;
  isOnlySwapRoute: boolean;
  fromAmount: string;
  toAmount: string;
  sender: string;
  recipient: string;
  totalUserTx: number;
  totalGasFeesInUsd: number;
  userTxs: SameChainUserTx[];
  usedDexName: string;
  integratorFee: IntegratorFee;
  outputValueInUsd: number;
  receivedValueInUsd: number;
  inputValueInUsd: number;
}

interface CrossChainSwapResult {
  routes: CrossChainRoute[];
  socketRoute: null;
  destinationCallData: Record<string, any>;
  fromChainId: number;
  fromAsset: TokenInfo;
  toChainId: number;
  toAsset: TokenInfo;
  bridgeRouteErrors: Record<string, BridgeRouteError>;
}

interface SameChainSwapResult {
  routes: SameChainRoute[];
  fromChainId: number;
  fromAsset: TokenInfo;
  toChainId: number;
  toAsset: TokenInfo;
}

interface RouteResponse {
  success: boolean;
  result: SameChainSwapResult | CrossChainSwapResult;
}

export {
  type RouteResponse,
  type SameChainSwapResult,
  type CrossChainSwapResult,
  type SameChainRoute,
  type CrossChainRoute,
  type Step,
};
