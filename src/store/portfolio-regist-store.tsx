import { create } from 'zustand';

export interface IPortfolioRegistInfo {
  title: string;
  detail?: string;
  tagList?: string[];
  togather?: string;
}

export interface IPortfolioRegistImage {
  prevImageUrl: string;
  file?: File | null;
  isNew?: boolean;
  isDelete?: boolean;
}

interface PortfolioRegisterState {
  currentStep: number;
  maxStep: number;

  photoList: IPortfolioRegistImage[] | null;
  portfolioInfo: IPortfolioRegistInfo;

  // actions
  init: () => void;
  clear: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setPhoto: (photoList: IPortfolioRegistImage[]) => void;
  addPhoto: (photoList: IPortfolioRegistImage[]) => void;
  deletePhoto: (photoInfo: IPortfolioRegistImage, i: number) => void;
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
    addPhoto: (photoList) =>
      set((state) => {
        const prevList = state.photoList || [];
        const newList = [...prevList, ...photoList];

        return { photoList: newList };
      }),

    deletePhoto: (photoInfo, idx) =>
      set((state) => {
        const prevList = state.photoList || [];
        let newList: IPortfolioRegistImage[] = [];

        if (photoInfo.isNew) {
          newList = prevList.filter((_, i) => i !== idx);
        } else {
          newList = prevList.map((el, i) => {
            if (i === idx) {
              return { ...el, isDelete: true };
            }
            return el;
          });
        }

        return { photoList: newList };
      }),

    setPortfolioInfo: (info) =>
      set((state) => ({
        portfolioInfo: { ...state.portfolioInfo, ...info },
      })),
  }),
);
