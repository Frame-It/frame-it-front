import { IRecruitCardProps } from '@/components/project/recruit-card';
import { create } from 'zustand';

interface RecruitState {
  recruits: IRecruitCardProps[];
  setRecruits: (recruits: IRecruitCardProps[]) => void;
  toggleBookmark: (id: number) => void;
}

export const useRecruitStore = create<RecruitState>((set) => ({
  recruits: [],
  setRecruits: (recruits) => set({ recruits }),
  toggleBookmark: (id) =>
    set((state) => ({
      recruits: state.recruits.map((recruit) =>
        recruit.id === id
          ? { ...recruit, isBookmarked: !recruit.isBookmarked }
          : recruit,
      ),
    })),
}));
