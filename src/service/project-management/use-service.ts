import { decodeUserProject } from '@/lib/api/project/decoder';
import { IManageProject, Status } from '@/types/project.type';
import { useQuery } from '@tanstack/react-query';
import { getUserProjects } from './service';

// Query

export const useUserProjectsQuery = (
  status?: Status,
  includesApplicant = true,
) => {
  return useQuery<IManageProject[], Error>({
    queryKey: ['userProjects', { status, includesApplicant }],
    queryFn: async () => {
      const data = await getUserProjects(status, includesApplicant);
      return data.projects.map(decodeUserProject);
    },
    staleTime: 60000,
  });
};
