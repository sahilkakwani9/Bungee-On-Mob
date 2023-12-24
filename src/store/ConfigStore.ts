import { create } from "zustand";
import { IConfigStore } from "../types/store";

export const useConfigStore = create<IConfigStore>((set) => ({
  supportedChains: null,
  sendingChains: null,
  receivingChains: null,
  setSupportedChains: (chains) => {
    set({ supportedChains: chains });
  },
  setSendingChains: (chains) => {
    set({ sendingChains: chains });
  },
  setReceivingChains: (chains) => {
    set({ receivingChains: chains });
  },
}));
