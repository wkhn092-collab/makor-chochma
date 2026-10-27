"use client";

import { create } from "zustand";
import type { InterestId } from "@/content/site";

type LeadUiState = {
  interest: InterestId | null;
  /** Optional soft cross-sell — IDs only, never PII */
  secondaryInterest: InterestId | null;
  stickyVisible: boolean;
  setInterest: (interest: InterestId) => void;
  setSecondaryInterest: (secondary: InterestId | null) => void;
  setStickyVisible: (visible: boolean) => void;
};

/** Client UI only — never store name/phone here */
export const useLeadUi = create<LeadUiState>((set) => ({
  interest: null,
  secondaryInterest: null,
  stickyVisible: false,
  setInterest: (interest) =>
    set({ interest, secondaryInterest: null }),
  setSecondaryInterest: (secondaryInterest) => set({ secondaryInterest }),
  setStickyVisible: (stickyVisible) => set({ stickyVisible }),
}));
