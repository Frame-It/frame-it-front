import { IProjectConcept } from '@/constants/project';

export type UserRole = 'HOST' | 'GUEST';
export type Identity = 'MODEL' | 'PHOTOGRAPHER';
export type TimeOption = 'MORNING' | 'AFTERNOON' | 'TO_BE_DISCUSSED';
export type LocationType = 'INDOOR' | 'OUTDOOR';
export type Status = 'RECRUITING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';
export type ActiveStatus = Exclude<Status, 'CANCELED'>;

export interface IProject {
  id: number;
  title: string;
  shootingAt: string; // Date
  timeOption: TimeOption;
  spot: string;
  status: Status;
}

export interface IManageProject extends IProject {
  isHost: boolean;
}

export interface IActiveProject extends IProject {
  status: ActiveStatus;
}

export interface IRecruitProject extends IProject {
  type: Identity;
  imageUrl: string;
  tagList: IProjectConcept[];
  isBookmarked: boolean;
}

export interface IRecruitProjectDetail extends IRecruitProject {
  description: string;
  retouchingDescription: string;
  hostConcepts: string[];
  host: {
    id: number;
    nickname: string;
    profileImageUrl: string;
    description: string;
    identity: Identity;
  };
  conceptPhotoUrls: string[];
  isHost: boolean;
}

export interface IApplyInfo {
  profileImage: string;
  name: string;
  applicationDate: string;
  content: string;
  partnerRole: UserRole;
  userId: string;
}
