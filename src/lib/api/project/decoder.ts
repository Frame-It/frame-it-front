import { PROJECT_CONCEPTS } from '@/constants/project';
import { IRecruitProject, IRecruitProjectDetail } from '@/types/project.type';
import { IRecruitDetailRes, IRecruitRes } from './project.interface';

export const decodeRecruitResToRecruitProjectDetail = (
  recruit: IRecruitDetailRes,
): IRecruitProjectDetail => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = String(date.getFullYear()).slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  return {
    id: recruit.id,
    title: recruit.title,
    description: recruit.description,
    type: recruit.recruitmentRole,
    shootingAt: formatDate(recruit.shootingAt),
    imageUrl: recruit.previewImageUrl,
    tagList: recruit.projectConcepts.map((concept) => {
      return {
        id: concept,
        label: PROJECT_CONCEPTS.find(({ id }) => id === concept)?.label ?? '',
      };
    }),
    timeOption: recruit.timeOption,
    spot: recruit.spot,
    status: 'RECRUITING',
    isBookmarked: recruit.isBookmarked,
    conceptPhotoUrls: recruit.conceptPhotoUrls,
    host: recruit.host,
    hostConcepts: recruit.hostConcepts,
    isHost: recruit.isHost,
    retouchingDescription: recruit.retouchingDescription,
  };
};

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
