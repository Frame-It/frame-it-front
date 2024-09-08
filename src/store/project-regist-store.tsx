import { create } from 'zustand';

interface IProjectRegistInfo {
  type: '모델' | '작가';
  projectName: string;
  shootingDate: {
    date: string;
    time: string;
    period: '오전' | '오후' | '시간협의';
  };
  location: { type: '실내' | '야외'; address: string; detail: string };
  conceptTags: string[];
  photos: File[] | null;
  description: string;
  retouchingDetails: string;
}

interface ProjectRegisterState {
  currentStep: number;
  maxStep: number;

  projectInfo: IProjectRegistInfo;

  nextStep: () => void;
  prevStep: () => void;
  setProjectInfo: (info: Partial<IProjectRegistInfo>) => void;
  setPhotos: (photos: File[]) => void;
}

export const useProjectRegisterStore = create<ProjectRegisterState>((set) => ({
  currentStep: 1,
  maxStep: 2,
  projectInfo: {
    type: '모델',
    projectName: '',
    shootingDate: { date: '', time: '', period: '오전' },
    location: { type: '실내', address: '', detail: '' },
    conceptTags: [],
    photos: null,
    description: '',
    retouchingDetails: '',
  },

  prevStep() {
    set((state) => ({
      currentStep: Math.max(1, state.currentStep - 1),
    }));
  },

  nextStep() {
    set((state) => ({
      currentStep: Math.min(state.maxStep, state.currentStep + 1),
    }));
  },

  setProjectInfo: (info) =>
    set((state) => ({
      projectInfo: { ...state.projectInfo, ...info },
    })),

  setPhotos: (photos) =>
    set((state) => ({
      projectInfo: { ...state.projectInfo, photos },
    })),
}));
