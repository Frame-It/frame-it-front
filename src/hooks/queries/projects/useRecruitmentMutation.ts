import { RecruitmentQueryKey } from '@/constants/query-keys/project';
import { postAnnouncement } from '@/service/project/recruitment';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRecruitmentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { projectId } = await postAnnouncement(formData);
      console.log(projectId);
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
