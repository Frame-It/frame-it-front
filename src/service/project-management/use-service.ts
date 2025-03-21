import { IManageProject, Status } from '@/types/project.type';
import { useQuery } from '@tanstack/react-query';
import { userProjectsQueryOption } from './query-option';

// Query

export const useUserProjectsQuery = (
  status?: Status,
  includesApplicant = true,
) => {
  return useQuery<IManageProject[], Error>(
    userProjectsQueryOption(status, includesApplicant),
  );
};
