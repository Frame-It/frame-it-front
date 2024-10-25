import { Identity, LocationType, TimeOption } from '@/types/project.type';
import { create } from 'zustand';

interface IProjectRegistInfo {
  type: Identity;
  projectName: string;
  shootingDate: {
    date: string;
    // time: string;
    period: TimeOption | null;
  };
  location: { type: LocationType | null; address: string; detail: string };
  conceptTags: string[];
  photos: File[] | null;
  photoUrls?: string[] | null;
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
  reset: () => void; // 상태 초기화를 위한 메서드
}

const initialProjectInfo: IProjectRegistInfo = {
  type: 'PHOTOGRAPHER',
  projectName: '',
  // shootingDate: { date: '', time: '', period: null },
  shootingDate: { date: '', period: null },
  location: { type: null, address: '', detail: '' },
  conceptTags: [],
  photos: null,
  description: '',
  retouchingDetails: '',
};

export const useProjectRegisterStore = create<ProjectRegisterState>((set) => ({
  currentStep: 1,
  maxStep: 2,
  projectInfo: initialProjectInfo,

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

  reset() {
    set({
      currentStep: 1,
      projectInfo: initialProjectInfo,
    });
  },
}));
