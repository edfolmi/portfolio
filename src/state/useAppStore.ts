import create from 'zustand';
import type { Project } from '../types';

interface AppState {
  projects: Project[];
  setProjects: (p: Project[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  projects: [],
  setProjects: (p) => set({ projects: p }),
}));
