import { RecruitmentQueryKey } from '@/constants/query-keys/project';
import { decodeRecruitResToRecruitProject } from '@/lib/api/project/decoder';
import { IRecruitFilter } from '@/lib/api/project/project.interface';
import { getRecruitAnnouncements } from '@/service/project/recruitment';
import { useQuery } from '@tanstack/react-query';

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
