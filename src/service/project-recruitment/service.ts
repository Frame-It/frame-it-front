import { getAuthHeader } from '@/lib/api/header';
import { IRecruitFilter } from '@/lib/api/project/project.interface';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getRecruitAnnouncements = async ({
  recruitmentRole,
  startDate,
  endDate,
  timeOption,
  locationType,
  concepts,
  spot,
}: IRecruitFilter) => {
  // const headers = await getAuthHeader();

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
  if (spot) queryParams.append('spot', spot);

  const queryParamString = queryParams.toString();
  const url = `${API_URL}/projects/announcement${queryParamString ? `?${queryParamString}` : ''}`;

  const res = await fetch(url, {
    // headers,
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
  const url = `${API_URL}/projects/${id}/announcement`;
  const res = await fetch(url, {
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

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const putAnnouncement = async (
  formData: FormData,
  projectId: number,
) => {
  const headers = await getAuthHeader();

  try {
    const response = await fetch(`${API_URL}/projects/${projectId}`, {
      method: 'PUT',
      body: formData,
      headers,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }
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

export const getSigunguList = async (keyword: string) => {
  const url = `/vworld/req/data?attrFilter=sig_kor_nm:like:${keyword}&geometry=false&data=LT_C_ADSIGG_INFO&request=GetFeature&key=${process.env.NEXT_PUBLIC_VWORLD_API_KEY}&domain=www.frameit.kr`;

  const res = await fetch(url);

  const data = await res.json();

  return {
    page: data.response.page,
    record: data.response.record,
    features: data.response.result?.featureCollection.features ?? [],
  };
};
