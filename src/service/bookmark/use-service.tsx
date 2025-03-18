import { RecruitmentQueryKey } from '@/constants/query-keys/project';
import {
  deleteRecruitBookmark,
  postRecruitBookmark,
} from '@/service/project-recruitment/service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Query

// Infinite Query

// Mutation

export const useRecruitBookmarkMutation = () => {
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
