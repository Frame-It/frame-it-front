import { IRecruitFilter } from '@/lib/api/project/project.interface';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createRecruitmentEditMutationOption,
  createRecruitmentPostMutationOption,
  recruitmentDetailQueryOption,
  recruitmentListQueryOption,
} from './query-option';

// Query

export const useProjectRecruitmentsQuery = (filter: IRecruitFilter) =>
  useQuery(recruitmentListQueryOption(filter));

export const useRecruitmentQuery = (projectId: number) =>
  useQuery(recruitmentDetailQueryOption(projectId));

// Mutation

export const useRecruitmentMutation = () => {
  const queryClient = useQueryClient();
  const mutationOptions = createRecruitmentPostMutationOption(queryClient);
  return useMutation(mutationOptions);
};

export const useRecruitmentEditMutation = () => {
  const queryClient = useQueryClient();
  const mutationOptions = createRecruitmentEditMutationOption(queryClient);
  return useMutation(mutationOptions);
};
