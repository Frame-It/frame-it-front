import { create } from 'zustand';

interface PortfolioRegisterState {
  currentStep: number;

  photoList: File[] | null;
  userInfo: {
    name: string;
    email: string;
  };

  nextStep: () => void;
  prevStep: () => void;
  setPhoto: (photoList: File[]) => void;
  setUserInfo: (info: { name: string; email: string }) => void;
}

export const usePortfolioRegisterStore = create<PortfolioRegisterState>(
  (set) => ({
    currentStep: 1,
    photoList: null,
    userInfo: {
      name: '',
      email: '',
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

    setUserInfo: (info) =>
      set((state) => ({
        userInfo: { ...state.userInfo, ...info },
      })),
  }),
);
