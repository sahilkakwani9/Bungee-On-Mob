import { create } from "zustand";
import { IConfigStore } from "../types/store";

export const useConfigStore = create<IConfigStore>((set, get) => ({
  supportedChains: null,
  sendingChains: null,
  receivingChains: null,
  selectedSendingChain: null,
  selectedReceivingChain: null,
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
}));
