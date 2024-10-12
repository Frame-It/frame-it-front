import { create } from 'zustand';

export interface IPortfolioRegistInfo {
  title: string;
  detail?: string;
  tagList?: string[];
  togather?: string;
}

interface PortfolioRegisterState {
  currentStep: number;
  maxStep: number;

  photoList: File[] | null;
  portfolioInfo: IPortfolioRegistInfo;

  init: () => void;
  clear: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setPhoto: (photoList: File[]) => void;
  setPortfolioInfo: (info: IPortfolioRegistInfo) => void;
}

export const usePortfolioRegisterStore = create<PortfolioRegisterState>(
  (set) => ({
    currentStep: 1,
    maxStep: 2,
    photoList: null,
    portfolioInfo: {
      title: '',
      detail: '',
      tagList: [],
      togather: '',
    },

    init() {},
    clear() {
      return set(() => {
        return {
          currentStep: 1,
          maxStep: 2,
          photoList: null,
          portfolioInfo: {
            title: '',
            detail: '',
            tagList: [],
            togather: '',
          },
        };
      });
    },

    prevStep() {
      return set((state) => {
        if (state.currentStep === 1) {
          return { currentStep: state.currentStep };
        }
        return { currentStep: state.currentStep - 1 };
      });
    },

    nextStep() {
      return set((state) => {
        if (state.currentStep === 2) {
          return { currentStep: state.currentStep };
        }
        return { currentStep: state.currentStep + 1 };
      });
    },

    setPhoto: (photoList) => set({ photoList }),

    setPortfolioInfo: (info) =>
      set((state) => ({
        portfolioInfo: { ...state.portfolioInfo, ...info },
      })),
  }),
);
