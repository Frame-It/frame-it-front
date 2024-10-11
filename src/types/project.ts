export interface IProject {
  id: string;
  title: string;
  state: 'recruiting' | 'inProgress' | 'complete';
  location: string;
  date: string;
  time: string;
}

export type UserRole = 'HOST' | 'GUEST';
export type ProfessionRole = 'MODEL' | 'PHOTOGRAPHER';
export type TimeOption = 'MORNING' | 'AFTERNOON' | 'TO_BE_DISCUSSED';
export type LocationType = 'INDOOR' | 'OUTDOOR';

export interface IApplyInfo {
  profileImage: string;
  name: string;
  applicationDate: string;
  content: string;
  partnerRole: UserRole;
}
