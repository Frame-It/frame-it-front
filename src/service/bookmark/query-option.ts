import { RecruitmentQueryKey } from '@/constants/query-keys/project';
import {
  deleteRecruitBookmark,
  postRecruitBookmark,
} from '@/service/project-recruitment/service';
import { QueryClient, UseMutationOptions } from '@tanstack/react-query';

export interface ToggleBookmarkParams {
  projectId: number;
  isBookmarked: boolean;
}

export const createRecruitBookmarkMutationOption = (
  queryClient: QueryClient,
): UseMutationOptions<void, Error, ToggleBookmarkParams> => ({
  mutationFn: async ({ projectId, isBookmarked }: ToggleBookmarkParams) => {
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
  onError: (error: Error) => {
    console.error('Failed to toggle bookmark:', error);
  },
});
