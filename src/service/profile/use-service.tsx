import { useQuery } from '@tanstack/react-query';
import { profileQueryOption } from './query-option';

// Query
export const useGetMyProfileQuery = () => useQuery(profileQueryOption());

// Infinite Query

// Mutation
