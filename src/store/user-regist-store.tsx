import { create } from 'zustand';

export interface IUserCheckList {
  age: boolean;
  use: boolean;
  info: boolean;
  marketing: boolean;
}
export type TCheckListKeys = keyof IUserCheckList;

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

  toggleAllCheck: (checked: boolean) => void;
  toggleItemCheck: (item: TCheckListKeys, checked: boolean) => void;

  setRole: (role: string) => void;
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

  toggleAllCheck: (checked) =>
    set((state) => ({
      userInfo: {
        ...state.userInfo,
        agreeList: {
          age: checked,
          info: checked,
          marketing: checked,
          use: checked,
        },
      },
    })),

  toggleItemCheck: (item, checked) =>
    set((state) => ({
      userInfo: {
        ...state.userInfo,
        agreeList: {
          ...state.userInfo.agreeList,
          [item]: checked,
        },
      },
    })),

  setRole: (role) =>
    set((state) => ({
      userInfo: { ...state.userInfo, role },
    })),
}));

export const useUserRegisterPrevStep = () =>
  useUserRegisterStore((state) => state.prevStep);
export const useUserRegisterNextStep = () =>
  useUserRegisterStore((state) => state.nextStep);
export const useUserRegisterToggleAllCheck = () =>
  useUserRegisterStore((state) => state.toggleAllCheck);
export const useUserRegisterToggleItemCheck = () =>
  useUserRegisterStore((state) => state.toggleItemCheck);
export const useUserRegisterSetRole = () =>
  useUserRegisterStore((state) => state.setRole);
