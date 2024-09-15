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
  name: null | string;
  birth: Date | null;
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
  setName: (name: string) => void;
  setBirth: (birth: Date) => void;
  setNickName: (nickname: string) => void;
}

export const useUserRegisterStore = create<UserRegisterState>((set) => ({
  currentStep: 1,
  minStep: 1,
  maxStep: 4,

  userInfo: {
    agreeList: {
      age: false,
      info: false,
      use: false,
      marketing: false,
    },
    name: null,
    nickname: null,
    role: null,
    birth: null,
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

  setName: (name) =>
    set((state) => ({
      userInfo: { ...state.userInfo, name },
    })),

  setBirth: (birth) =>
    set((state) => ({
      userInfo: { ...state.userInfo, birth },
    })),
  setNickName: (nickname) =>
    set((state) => ({
      userInfo: { ...state.userInfo, nickname },
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
export const useUserRegisterSetBirth = () =>
  useUserRegisterStore((state) => state.setBirth);
export const useUserRegisterSetName = () =>
  useUserRegisterStore((state) => state.setName);
export const useUserRegisterSetNickName = () =>
  useUserRegisterStore((state) => state.setNickName);
