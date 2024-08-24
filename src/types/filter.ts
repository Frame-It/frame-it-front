export type UserValue = 'ALL' | 'MODEL' | 'PHOTOGRAPHER';
export type UserLabel = '전체' | '모델' | '작가';

export const USER_TYPE: Record<UserValue, UserLabel> = {
  ALL: '전체',
  MODEL: '모델',
  PHOTOGRAPHER: '작가',
};
