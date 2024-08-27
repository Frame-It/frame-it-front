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
    nextStep() {
      if (this.currentStep === 2) {
        return;
      }
      return set((state) => ({ currentStep: state.currentStep + 1 }));
    },
    prevStep() {
      if (this.currentStep === 1) {
        return;
      }
      return set((state) => ({ currentStep: state.currentStep - 1 }));
    },
    setPhoto: (photoList) => set({ photoList }),
    setUserInfo: (info) =>
      set((state) => ({
        userInfo: { ...state.userInfo, ...info },
      })),
  }),
);
