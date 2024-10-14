import { IProject, Status } from '@/types/project.type';
import { create } from 'zustand';

interface ProjectManagementState {
  projects: IProject[];
  setProjects: (projects: IProject[]) => void;
  updateProjectStatus: (id: number, newStatus: Status) => void;
  deleteProject: (id: number) => void;
}

export const useProjectManagementStore = create<ProjectManagementState>(
  (set) => ({
    projects: [],
    setProjects: (projects) => set({ projects }),
    updateProjectStatus: (id, newStatus) =>
      set((state) => ({
        projects: state.projects.map((project) =>
          project.id === id ? { ...project, status: newStatus } : project,
        ),
      })),
    deleteProject: (id) =>
      set((state) => ({
        projects: state.projects.filter((project) => project.id !== id),
      })),
  }),
);
