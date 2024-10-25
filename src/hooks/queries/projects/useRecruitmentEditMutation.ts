import { RecruitmentQueryKey } from '@/constants/query-keys/project';
import { putAnnouncement } from '@/service/project/recruitment';

import { useMutation, useQueryClient } from '@tanstack/react-query';

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
