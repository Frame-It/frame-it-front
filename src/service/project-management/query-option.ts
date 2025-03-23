import { decodeUserProject } from '@/lib/api/project/decoder';
import { Status } from '@/types/project.type';
import { getUserProjects } from './service';

export const userProjectsQueryKeys = {
  all: () => ['userProjects'],
  list: (status?: Status, includesApplicant = true) => [
    ...userProjectsQueryKeys.all(),
    { status, includesApplicant },
  ],
};

export const userProjectsQueryOption = (
  status?: Status,
  includesApplicant = true,
) => ({
  queryKey: userProjectsQueryKeys.list(status, includesApplicant),
  queryFn: async () => {
    const data = await getUserProjects(status, includesApplicant);
    return data.projects.map(decodeUserProject);
  },
  staleTime: 60000,
});
