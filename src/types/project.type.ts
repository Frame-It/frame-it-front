export interface IProject {
  id: number;
  title: string;
  shootingAt: string; // Date
  timeOption: TimeOption;
  spot: string;
  status: Status;
  isHost: boolean;
}

export interface IActiveProject extends IProject {
  status: ActiveStatus;
}

export type UserRole = 'HOST' | 'GUEST';
export type ProfessionRole = 'MODEL' | 'PHOTOGRAPHER';
export type TimeOption = 'MORNING' | 'AFTERNOON' | 'TO_BE_DISCUSSED';
export type LocationType = 'INDOOR' | 'OUTDOOR';
export type Status = 'RECRUITING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';
export type ActiveStatus = Exclude<Status, 'CANCELED'>;

export interface IApplyInfo {
  profileImage: string;
  name: string;
  applicationDate: string;
  content: string;
  partnerRole: UserRole;
  userId: string;
}
