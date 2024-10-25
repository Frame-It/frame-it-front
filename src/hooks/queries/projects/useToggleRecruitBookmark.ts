import { RecruitmentQueryKey } from '@/constants/query-keys/project';
import {
  deleteRecruitBookmark,
  postRecruitBookmark,
} from '@/service/project/recruitment';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useToggleRecruitBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      projectId,
      isBookmarked,
    }: {
      projectId: number;
      isBookmarked: boolean;
    }) => {
      if (isBookmarked) {
        await deleteRecruitBookmark(projectId);
      } else {
        await postRecruitBookmark(projectId);
      }
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
      console.error('Failed to toggle bookmark:', error);
    },
  });
};
