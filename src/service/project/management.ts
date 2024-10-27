import { Status, UserRole } from '@/types/project.type';

import { getAuthHeader } from '@/lib/api/header';
import { IRecruitingProjectRes } from '@/lib/api/project/project.interface';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
  userRole: UserRole,
): Promise<IRecruitingProjectRes> => {
  const headers = await getAuthHeader();

  const res = await fetch(
    `${API_URL}/recruiting-projects/${projectId}/${userRole.toLowerCase()}`,
    {
      headers,
      cache: 'no-store',
    },
  );

  const data: IRecruitingProjectRes = await res.json();

  if (!res.ok) {
    console.log(data);
    throw new Error('Failed to fetch recruiting project');
  }
  return data;
};

export const getInProgressProject = async (
  projectId: number,
  userRole: UserRole,
): Promise<IRecruitingProjectRes> => {
  const headers = await getAuthHeader();

  const res = await fetch(
    `${API_URL}/in-progress-projects/${projectId}/${userRole.toLowerCase()}`,
    {
      headers,
      cache: 'no-store',
    },
  );

  const data: IRecruitingProjectRes = await res.json();
  if (!res.ok) {
    console.log(data);

    throw new Error('Failed to fetch in-progress project');
  }

  return data;
};

export const getCompletedProject = async (
  projectId: number,
  userRole: UserRole,
): Promise<IRecruitingProjectRes> => {
  const headers = await getAuthHeader();

  const res = await fetch(
    `${API_URL}/completed-projects/${projectId}/${userRole.toLowerCase()}`,
    {
      headers,
      cache: 'no-store',
    },
  );

  const data: IRecruitingProjectRes = await res.json();
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
