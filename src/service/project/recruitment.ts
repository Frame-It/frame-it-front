import { getAuthHeader } from '@/lib/api/header';
import { IRecruitFilter } from '@/lib/api/project/project.interface';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchRecruitAnnouncements = async (filter: IRecruitFilter) => {
  const query = new URLSearchParams(
    filter as Record<string, string>,
  ).toString();
  const response = await fetch(`${API_URL}/projects/announcement?${query}`);

  if (!response.ok) {
    throw new Error('Failed to fetch recruit announcements');
  }

  return response.json();
};

export const getRecruitAnnouncements = async ({
  recruitmentRole,
  startDate,
  endDate,
  timeOption,
  locationType,
  concepts,
}: IRecruitFilter) => {
  const headers = await getAuthHeader();

  const queryParams = new URLSearchParams();
  if (recruitmentRole) queryParams.append('recruitmentRole', recruitmentRole);
  if (startDate) queryParams.append('startDate', startDate.slice(0, 10));
  if (endDate) queryParams.append('endDate', endDate.slice(0, 10));
  if (timeOption) queryParams.append('timeOption', timeOption);
  if (locationType) queryParams.append('locationType', locationType);
  if (concepts) {
    concepts.forEach((concept) => {
      queryParams.append('concepts', concept);
    });
  }

  const queryParamString = queryParams.toString();
  const url = `${API_URL}/projects/announcement${queryParamString ? `?${queryParamString}` : ''}`;

  const res = await fetch(url, {
    headers,
    cache: 'no-store',
  });

  const data = await res.json();
  if (res.status === 403) {
    const res = await fetch(url, {
      cache: 'no-store',
    });
    const data = await res.json();

    return data;
  }
  if (res.status !== 200) {
    console.error(data.message);
    return []; // TODO: error handling
  }
  return data;
};

export const getRecruitAnnouncement = async (id: number) => {
  const headers = await getAuthHeader();
  const url = `${API_URL}/projects/${id}/announcement`;
  const res = await fetch(url, {
    headers,
    cache: 'no-store',
  });
  const data = await res.json();
  if (res.status === 403) {
    const res = await fetch(url, {
      cache: 'no-store',
    });
    const data = await res.json();

    return data;
  }
  if (res.status !== 200) {
    console.error(data.message);
  }
  return data;
};

export const postAnnouncement = async (formData: FormData) => {
  const headers = await getAuthHeader();

  try {
    const response = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      body: formData,
      headers,
    });

    if (!response.ok) {
      // throw new Error('Network response was not ok');
    }

    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const putAnnouncement = async (formData: FormData) => {
  const headers = await getAuthHeader();

  try {
    const response = await fetch(`${API_URL}/projects`, {
      method: 'PUT',
      body: formData,
      headers,
    });

    if (!response.ok) {
      // throw new Error('Network response was not ok');
    }

    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const postRecruitBookmark = async (id: number) => {
  const headers = await getAuthHeader();

  try {
    await fetch(`${API_URL}/projects/${id}/bookmarks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
  } catch (e) {
    console.error(e);
  }
};

export const deleteRecruitBookmark = async (id: number) => {
  const headers = await getAuthHeader();

  try {
    await fetch(`${API_URL}/projects/${id}/bookmarks`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
  } catch (e) {
    console.error(e);
  }
};

export const postProjectApply = async (
  projectId: number,
  applyContent: string,
) => {
  const headers = await getAuthHeader();

  const res = await fetch(`${API_URL}/projects/${projectId}/apply`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      applyContent,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to post apply project');
  }
};
