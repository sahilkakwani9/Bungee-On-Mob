import { create } from "zustand";
import { IConfigStore } from "../types/store";

export const useConfigStore = create<IConfigStore>((set, get) => ({
  supportedChains: null,
  sendingChains: null,
  receivingChains: null,
  selectedSendingChain: null,
  selectedReceivingChain: null,
  sendingTokens: null,
  receivingTokens: null,
  selectedSendingToken: null,
  selectedReceivingToken: null,
  tokensLoading: true,
  setSupportedChains: (chains) => {
    set({ supportedChains: chains });
  },
  setSendingChains: (chains) => {
    set({ sendingChains: chains });
  },
  setReceivingChains: (chains) => {
    set({ receivingChains: chains });
  },
  setSelectedSendingChain: (selectedChain) => {
    set({ selectedSendingChain: selectedChain });
  },
  setSelectedReceivingChain: (selectedChain) => {
    set({ selectedReceivingChain: selectedChain });
  },
  setSendingTokens: (tokens) => {
    set({ sendingTokens: tokens });
  },
  setReceivingTokens: (tokens) => {
    set({ receivingTokens: tokens });
  },
  setSelectedSendingToken: (selectedToken) => {
    set({ selectedSendingToken: selectedToken });
  },
  setSelectedReceivingToken: (selectedToken) => {
    set({ selectedReceivingToken: selectedToken });
  },
  setTokensLoading: (value) => {
    set({ tokensLoading: value });
  },
}));
