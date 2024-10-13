import { LocationType, ProfessionRole, TimeOption } from '@/types/project.type';
import { create } from 'zustand';

interface IProjectRegistInfo {
  type: ProfessionRole;
  projectName: string;
  shootingDate: {
    date: string;
    time: string;
    period: TimeOption;
  };
  location: { type: LocationType; address: string; detail: string };
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
  reset: () => void; // 상태 초기화를 위한 메서드
}

const initialProjectInfo: IProjectRegistInfo = {
  type: 'PHOTOGRAPHER',
  projectName: '',
  shootingDate: { date: '', time: '', period: 'MORNING' },
  location: { type: 'INDOOR', address: '', detail: '' },
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
