import { RecruitmentQueryKey } from '@/constants/query-keys/project';
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
import { IRecruitProjectDetail } from '@/types/project.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Query

export const useProjectRecruitmentsQuery = (filter: IRecruitFilter) => {
  return useQuery({
    queryKey: [RecruitmentQueryKey.RECRUIT_ANNOUNCEMENTS, filter],
    queryFn: async () => {
      const recruitData = await getRecruitAnnouncements(filter);
      return recruitData.map(decodeRecruitResToRecruitProject);
    },
    staleTime: 60000,
  });
};

export const useRecruitmentQuery = (projectId: number) => {
  return useQuery({
    queryKey: [RecruitmentQueryKey.RECRUIT_ANNOUNCEMENT, projectId],
    queryFn: async () => {
      const projectData: IRecruitDetailRes =
        await getRecruitAnnouncement(projectId);

      const recruitDetail: IRecruitProjectDetail =
        decodeRecruitResToRecruitProjectDetail(projectData);

      return recruitDetail;
    },
    staleTime: 60000,
  });
};

// Mutation

export const useRecruitmentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { projectId } = await postAnnouncement(formData);
      return projectId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [RecruitmentQueryKey.RECRUIT_ANNOUNCEMENTS],
      });
    },
    onError: (error) => {
      console.error('Failed to post announcement:', error);
    },
  });
};

export const useRecruitmentEditMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
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
    onError: (error) => {
      console.error('Failed to post announcement:', error);
    },
  });
};
