import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createRecruitBookmarkMutationOption,
  ToggleBookmarkParams,
} from './query-option';

// Query

// Infinite Query

// Mutation

export const useRecruitBookmarkMutation = (): UseMutationResult<
  void,
  Error,
  ToggleBookmarkParams
> => {
  const queryClient = useQueryClient();
  const mutationOptions = createRecruitBookmarkMutationOption(queryClient);
  return useMutation(mutationOptions);
};
