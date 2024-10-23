import { ActiveStatus, Status, TimeOption } from '@/types/project.type';
import { getAuthHeader } from '../header';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 공통 프로젝트 타입
interface BaseProject {
  title: string;
  spot: string;
  timeOption: TimeOption;
  shootingAt: string;
  status: ActiveStatus;
}

// 지원자 정보 타입 (RECRUITING 상태에서 사용)
export interface Applicant {
  applicantId: number;
  nickname: string;
  profileImageUrl: string | null;
  appliedAt: string;
  applyContent: string;
}

// 본인의 지원 정보 타입 (GUEST로 프로젝트 참여한 경우)
export interface MyApplication extends Applicant {}

// 진행 중 또는 완료된 프로젝트의 멤버 정보 (상대방)
export interface ProjectMember {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
}

// 모집 중인 프로젝트 타입
export interface RecruitingProject extends BaseProject {
  status: 'RECRUITING';
  applicants?: Applicant[]; // HOST인 경우
  myApplication?: MyApplication; // GUEST인 경우
  hostId?: number; // GUEST인 경우
}

// 진행 중인 프로젝트 타입
export interface InProgressProject extends BaseProject {
  status: 'IN_PROGRESS';
  isHost: boolean;
  guest?: ProjectMember & {
    isReviewDone: boolean;
    reviewId: number | null;
    appliedAt: string;
    applyContent: string;
  };
  host?: ProjectMember & {
    isReviewDone: boolean;
    reviewId: number | null;
  };
  appliedAt: string;
  applyContent: string;
  isReviewDone: boolean;
  reviewId: number | null;
}

// 완료된 프로젝트 타입
export interface CompletedProject extends BaseProject {
  status: 'COMPLETED';
  isReviewDone: boolean;
  reviewId: number | null;
  guest?: ProjectMember & {
    isReviewDone: boolean;
    reviewId: number | null;
    appliedAt: string;
    applyContent: string;
  };
  host?: ProjectMember & {
    isReviewDone: boolean;
    reviewId: number | null;
  };
}

export const getUserProjects = async (
  status?: Status,
  includesApplicant = true,
) => {
  const headers = await getAuthHeader();

  const queryParams = new URLSearchParams();
  if (status) {
    queryParams.set('status', status);
  }
  queryParams.set('includesApplicant', includesApplicant.toString());

  const res = await fetch(
    `${API_URL}/users/projects?${queryParams.toString()}`,
    {
      headers,
      cache: 'no-store',
    },
  );
  const data = await res.json();

  if (res.status !== 200) {
    console.error(data.message);
  }

  return data;
};

export const getRecruitingProject = async (
  projectId: number,
  type: 'HOST' | 'GUEST',
): Promise<RecruitingProject> => {
  const headers = await getAuthHeader();

  const res = await fetch(
    `${API_URL}/recruiting-projects/${projectId}/${type.toLowerCase()}`,
    {
      headers,
      cache: 'no-store',
    },
  );

  const data: RecruitingProject = await res.json();
  console.log(data);

  if (!res.ok) {
    console.log(data);
    throw new Error('Failed to fetch recruiting project');
  }
  return data;
};

export const getInProgressProject = async (
  projectId: number,
  type: 'HOST' | 'GUEST',
): Promise<InProgressProject> => {
  const headers = await getAuthHeader();

  const res = await fetch(
    `${API_URL}/in-progress-projects/${projectId}/${type.toLowerCase()}`,
    {
      headers,
      cache: 'no-store',
    },
  );

  const data: InProgressProject = await res.json();
  if (!res.ok) {
    console.log('getInProgressProject:', data);

    throw new Error('Failed to fetch in-progress project');
  }
  // console.log('getInProgressProject:', data);

  return data;
};

export const getCompletedProject = async (
  projectId: number,
  type: 'HOST' | 'GUEST',
): Promise<CompletedProject> => {
  const headers = await getAuthHeader();

  const res = await fetch(
    `${API_URL}/completed-projects/${projectId}/${type.toLowerCase()}`,
    {
      headers,
      cache: 'no-store',
    },
  );

  const data: CompletedProject = await res.json();
  if (!res.ok) {
    console.log(data);

    throw new Error('Failed fetch completed project');
  }
  return data;
};

export const postStartProject = async (
  projectId: number,
  applicantId: number,
) => {
  const headers = await getAuthHeader();

  const res = await fetch(
    `${API_URL}/projects/${projectId}/applicants/${applicantId}/accept`,
    {
      method: 'POST',
      headers,
    },
  );

  if (!res.ok) {
    throw new Error('Failed to start project');
  }
};

export const postCompleteProject = async (projectId: number) => {
  const headers = await getAuthHeader();

  const res = await fetch(`${API_URL}/projects/${projectId}/complete`, {
    method: 'POST',
    headers,
  });

  if (!res.ok) {
    throw new Error('Failed to post complete project');
  }
  const data = await res.json();
  return data;
};

export const deleteApplyProject = async ({
  projectId,
  content,
  cancelReasons,
}: {
  projectId: number;
  content: string;
  cancelReasons: string[];
}) => {
  const headers = await getAuthHeader();

  const res = await fetch(`${API_URL}/projects/${projectId}/applicants`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cancelReasons,
      content,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to delete project');
  }
};
