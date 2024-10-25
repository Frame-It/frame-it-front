import { RecruitmentQueryKey } from '@/constants/query-keys/project';
import { decodeRecruitResToRecruitProjectDetail } from '@/lib/api/project/decoder';
import { IRecruitDetailRes } from '@/lib/api/project/project.interface';
import { getRecruitAnnouncement } from '@/service/project/recruitment';
import { IRecruitProjectDetail } from '@/types/project.type';
import { useQuery } from '@tanstack/react-query';

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
