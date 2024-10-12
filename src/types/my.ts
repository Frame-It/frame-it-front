export interface IMyInfo {
  name: string;
  nickname: string;
  email: string;
  notificationsEnabled: boolean;
}

export interface IMyStudio {
  id: number;
  nickname: string;
  identity: string;
  profileImageUrl: string | null;
  portfolioCount: number;
  projectCount: number;
}
