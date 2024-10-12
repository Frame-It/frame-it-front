export interface Feed {
  id: number;
  title: string;
  userId: number;
  identity: 'MODEL' | 'AUTHOR';
  portfolioImageUrl: string;
  profileImageUrl: string | null;
  userName: string;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface PortfolioResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Feed[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: Pageable;
  empty: boolean;
}
