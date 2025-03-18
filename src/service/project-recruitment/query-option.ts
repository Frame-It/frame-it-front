import {
  decodeRecruitResToRecruitProject,
  decodeRecruitResToRecruitProjectDetail,
} from '@/lib/api/project/decoder';
import {
  IRecruitDetailRes,
  IRecruitFilter,
} from '@/lib/api/project/project.interface';
import {
  getRecruitAnnouncement,
  getRecruitAnnouncements,
  postAnnouncement,
  putAnnouncement,
} from '@/service/project-recruitment/service';
import { QueryClient } from '@tanstack/react-query';

enum RecruitmentQueryKey {
  RECRUIT_ANNOUNCEMENTS = 'RECRUIT_ANNOUNCEMENTS',
  RECRUIT_ANNOUNCEMENT = 'RECRUIT_ANNOUNCEMENT',
}

export const recruitmentQueryKeys = {
  all: () => [RecruitmentQueryKey.RECRUIT_ANNOUNCEMENTS],
  list: (filter: IRecruitFilter) => [...recruitmentQueryKeys.all(), filter],
  detail: (projectId: number) => [
    RecruitmentQueryKey.RECRUIT_ANNOUNCEMENT,
    projectId,
  ],
};

export const recruitmentListQueryOption = (filter: IRecruitFilter) => ({
  queryKey: recruitmentQueryKeys.list(filter),
  queryFn: async () => {
    const recruitData = await getRecruitAnnouncements(filter);
    return recruitData.map(decodeRecruitResToRecruitProject);
  },
  staleTime: 60000,
});

export const recruitmentDetailQueryOption = (projectId: number) => ({
  queryKey: recruitmentQueryKeys.detail(projectId),
  queryFn: async () => {
    const projectData: IRecruitDetailRes =
      await getRecruitAnnouncement(projectId);
    return decodeRecruitResToRecruitProjectDetail(projectData);
  },
  staleTime: 60000,
});

export const createRecruitmentPostMutationOption = (
  queryClient: QueryClient,
) => ({
  mutationFn: async (formData: FormData) => {
    const { projectId } = await postAnnouncement(formData);
    return projectId;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: [RecruitmentQueryKey.RECRUIT_ANNOUNCEMENTS],
    });
  },
  onError: (error: Error) => {
    console.error('Failed to post announcement:', error);
  },
});

export const createRecruitmentEditMutationOption = (
  queryClient: QueryClient,
) => ({
  mutationFn: async ({
    formData,
    projectId,
  }: {
    formData: FormData;
    projectId: number;
  }) => {
    await putAnnouncement(formData, projectId);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: [RecruitmentQueryKey.RECRUIT_ANNOUNCEMENTS],
    });
    queryClient.invalidateQueries({
      queryKey: [RecruitmentQueryKey.RECRUIT_ANNOUNCEMENT],
    });
  },
  onError: (error: Error) => {
    console.error('Failed to update announcement:', error);
  },
});
