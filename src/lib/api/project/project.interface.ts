import {
  ActiveStatus,
  Identity,
  LocationType,
  TimeOption,
} from '@/types/project.type';

export interface IRecruitRes {
  id: number;
  previewImageUrl: string;
  title: string;
  recruitmentRole: Identity;
  shootingAt: string; // Date
  timeOption: TimeOption;
  spot: string;
  concepts: string[];
  isBookmarked: boolean;
}

export interface IRecruitFilter {
  recruitmentRole?: Identity;
  startDate?: string;
  endDate?: string;
  timeOption?: TimeOption;
  locationType?: LocationType;
  concepts?: string[];
}

// 공통 프로젝트 타입
interface IBaseProject {
  title: string;
  spot: string;
  timeOption: TimeOption;
  shootingAt: string;
  status: ActiveStatus;
}

// 지원자 정보 타입 (RECRUITING 상태에서 사용)
export interface IApplicant {
  applicantId: number;
  nickname: string;
  profileImageUrl: string | null;
  appliedAt: string;
  applyContent: string;
}

// 본인의 지원 정보 타입 (GUEST로 프로젝트 참여한 경우)
export interface IMyApplication extends IApplicant {}

// 진행 중 또는 완료된 프로젝트의 멤버 정보 (상대방)
export interface IProjectMember {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
}

// 모집 중인 프로젝트 타입
export interface IRecruitingProjectRes extends IBaseProject {
  status: 'RECRUITING';
  applicants?: IApplicant[]; // HOST인 경우
  myApplication?: IMyApplication; // GUEST인 경우
  hostId?: number; // GUEST인 경우
}

// 진행 중인 프로젝트 타입
export interface InProgressProjectRes extends IBaseProject {
  status: 'IN_PROGRESS';
  isHost: boolean;
  guest?: IProjectMember & {
    isReviewDone: boolean;
    reviewId: number | null;
    appliedAt: string;
    applyContent: string;
  };
  host?: IProjectMember & {
    isReviewDone: boolean;
    reviewId: number | null;
  };
  appliedAt: string;
  applyContent: string;
  isReviewDone: boolean;
  reviewId: number | null;
}

// 완료된 프로젝트 타입
export interface ICompletedProjectRes extends IBaseProject {
  status: 'COMPLETED';
  isReviewDone: boolean;
  reviewId: number | null;
  guest?: IProjectMember & {
    isReviewDone: boolean;
    reviewId: number | null;
    appliedAt: string;
    applyContent: string;
  };
  host?: IProjectMember & {
    isReviewDone: boolean;
    reviewId: number | null;
  };
}
