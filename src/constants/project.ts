export const PROJECT_CONCEPTS = [
  { label: '모노톤', id: 'PC-001' },
  { label: '신비로운', id: 'PC-002' },
  { label: '레트로', id: 'PC-003' },
  { label: '스냅', id: 'PC-004' },
  { label: '스트릿', id: 'PC-005' },
  { label: '자연', id: 'PC-006' },
  { label: '개화기', id: 'PC-007' },
  { label: '빈티지', id: 'PC-008' },
  { label: '프로필', id: 'PC-009' },
  { label: '바디프로필', id: 'PC-010' },
  { label: '여행', id: 'PC-011' },
  { label: '케이팝', id: 'PC-012' },
  { label: '코스프레', id: 'PC-013' },
];

export const USER_CONCEPTS = [
  { label: '모노톤', id: 'PC-001' },
  { label: '신비로운', id: 'PC-002' },
  { label: '레트로', id: 'PC-003' },
  { label: '스냅', id: 'PC-004' },
  { label: '스트릿', id: 'PC-005' },
  { label: '자연', id: 'PC-006' },
  { label: '개화기', id: 'PC-007' },
  { label: '빈티지', id: 'PC-008' },
  { label: '프로필', id: 'PC-009' },
  { label: '바디프로필', id: 'PC-010' },
  { label: '여행', id: 'PC-011' },
  { label: '케이팝', id: 'PC-012' },
  { label: '코스프레', id: 'PC-013' },
];

export const REVIEW_TAGS = [
  { label: '포징을 잘해줘요', id: 'RE-001' },
  { label: '보정을 잘해줘요', id: 'RE-002' },
  { label: '친절해요', id: 'RE-003' },
  { label: '약속시간을 잘 지켜요', id: 'RE-004' },
  { label: '매너가 좋아요', id: 'RE-005' },
  { label: '커뮤니케이션이 잘 돼요', id: 'RE-006' },
  { label: '컨셉이 좋아요', id: 'RE-007' },
  { label: '선택할 카테고리가 없어요', id: 'RE-008' },
];

export type ITag = {
  label: string;
  id: string;
};

export type IProjectConcept = ITag;

export type IUserConcept = ITag;
