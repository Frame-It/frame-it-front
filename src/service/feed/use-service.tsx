import { useInfiniteQuery } from '@tanstack/react-query';
import { feedListQueryOption } from './query-option';
// Query

// Infinite Query

export const useFeedListQuery = (role: string) =>
  useInfiniteQuery(feedListQueryOption(role));

// Mutation
