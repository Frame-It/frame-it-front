import { PROJECT_CONCEPTS } from '@/constants/project';
import { IRecruitProject } from '@/types/project.type';
import { IRecruitRes } from './project.interface';

export const decodeRecruitResToRecruitProject = (
  recruit: IRecruitRes,
): IRecruitProject => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());
    return `${month}/${day}`;
  };

  return {
    id: recruit.id,
    title: recruit.title,
    type: recruit.recruitmentRole,
    shootingAt: formatDate(recruit.shootingAt),
    imageUrl: recruit.previewImageUrl,
    tagList: recruit.concepts.map((concept) => {
      return {
        id: concept,
        label: PROJECT_CONCEPTS.find(({ id }) => id === concept)?.label ?? '',
      };
    }),
    timeOption: recruit.timeOption,
    spot: recruit.spot,
    status: 'RECRUITING',
    isBookmarked: recruit.isBookmarked,
  };
};
