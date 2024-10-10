const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface IRecruitResponse {
  id: number;
  previewImageUrl: string;
  title: string;
  recruitmentRole: 'MODEL' | 'PHOTOGRAPHER';
  shootingAt: string; // Date
  timeOption: string;
  spot: string;
  concepts: string[];
  isBookmarked: boolean;
}

export const getRecruitAnnouncements = async (
  recruitmentRole: IRecruitResponse['recruitmentRole'],
) => {
  const queryParam = recruitmentRole
    ? `?recruitmentRole=${recruitmentRole}`
    : '';
  const res = await fetch(`${API_URL}/projects/announcement${queryParam}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`, // TODO: accessToken 처리
    },
    cache: 'no-store',
  });
  const data = await res.json();
  if (res.status !== 200) {
    console.error(data.message);
    return []; // TODO: error handling
  }
  return data;
};

export const getRecruitAnnouncement = async (id: number) => {
  const res = await fetch(`${API_URL}/projects/${id}/announcement`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`, // TODO: accessToken 처리
    },
    cache: 'no-store',
  });
  const data = await res.json();
  if (res.status !== 200) {
    console.error(data.message);
  }
  return data;
};

export const postRecruitBookmark = async (id: number) => {
  try {
    await fetch(`${API_URL}/projects/${id}/bookmarks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`, // TODO: accessToken 처리
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    console.error(e);
  }
};

export const deleteRecruitBookmark = async (id: number) => {
  try {
    await fetch(`${API_URL}/projects/${id}/bookmarks`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`, // TODO: accessToken 처리
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    console.error(e);
  }
};
