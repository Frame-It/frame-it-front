export interface IProject {
  id: string;
  title: string;
  state: 'recruiting' | 'inProgress' | 'complete';
  location: string;
  date: string;
  time: string;
}

type UserRole = 'HOST' | 'GUEST';

export interface IApplyInfo {
  profileImage: string;
  name: string;
  applicationDate: string;
  content: string;
  partnerRole: UserRole;
}
