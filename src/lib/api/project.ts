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
  const res = await fetch(`${API_URL}/projects/announcement${queryParam}`);
  const data: IRecruitResponse[] = await res.json();
  return data;
};
