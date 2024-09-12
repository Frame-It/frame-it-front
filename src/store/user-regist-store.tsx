import { create } from 'zustand';

interface IUserCheckList {
  age: boolean;
  use: boolean;
  info: boolean;
  marketing: boolean;
}
type TCheckListKeys = keyof IUserCheckList;

export interface IUserRegistInfo {
  agreeList: IUserCheckList;
  nickname: null | string;
  role: null | string;
}

interface UserRegisterState {
  currentStep: number;
  minStep: number;
  maxStep: number;
  userInfo: IUserRegistInfo;
  nextStep: () => void;
  prevStep: () => void;

  setAllCheck: () => void;
  setItemCheck: (item: TCheckListKeys) => void;
}

export const useUserRegisterStore = create<UserRegisterState>((set) => ({
  currentStep: 1,
  minStep: 1,
  maxStep: 3,
  userInfo: {
    agreeList: {
      age: false,
      info: false,
      use: false,
      marketing: false,
    },
    nickname: null,
    role: null,
  },

  prevStep() {
    return set((state) => {
      if (state.currentStep === state.minStep) {
        return { currentStep: state.currentStep };
      }
      return { currentStep: state.currentStep - 1 };
    });
  },

  nextStep() {
    return set((state) => {
      if (state.currentStep === state.maxStep) {
        return { currentStep: state.currentStep };
      }
      return { currentStep: state.currentStep + 1 };
    });
  },

  setAllCheck: () =>
    set((state) => ({
      userInfo: {
        ...state.userInfo,
        agreeList: {
          age: true,
          info: true,
          marketing: true,
          use: true,
        },
      },
    })),

  setItemCheck: (item) =>
    set((state) => ({
      userInfo: {
        ...state.userInfo,
        agreeList: {
          ...state.userInfo.agreeList,
          item,
        },
      },
    })),

  // setUserInfo: (info) =>
  //   set((state) => ({
  //     portfolioInfo: { ...state.portfolioInfo, ...info },
  //   })),
}));

export const useUserRegisterPrevStep = () =>
  useUserRegisterStore((state) => state.prevStep);
export const useUserRegisterNextStep = () =>
  useUserRegisterStore((state) => state.nextStep);
export const useUserRegisterSetAllCheck = () =>
  useUserRegisterStore((state) => state.setAllCheck);
export const useUserRegisterSetItemCheck = () =>
  useUserRegisterStore((state) => state.setItemCheck);
