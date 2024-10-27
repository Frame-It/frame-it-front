import { LocationType, TimeOption } from '@/types/project.type';
import { getAuthHeader } from '../header';

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

export interface IRecruitFilter {
  recruitmentRole?: IRecruitResponse['recruitmentRole'];
  startDate?: string;
  endDate?: string;
  timeOption?: TimeOption;
  locationType?: LocationType;
  concepts?: string[];
}

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
