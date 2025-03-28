export interface IFeed {
  id: number;
  title: string;
  userId: number;
  identity: 'MODEL' | 'AUTHOR';
  portfolioImageUrl: string;
  profileImageUrl: string | null;
  userName: string;
}

interface IPageable {
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

export interface IPortfolioResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: IFeed[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: IPageable;
  empty: boolean;
}

export interface IPortfolioDetail {
  id: number;
  title: string;
  userId: number;
  userNickname: string;
  identity: string;
  profileImageUrl: string | null;
  userName: string;
  description: string;
  photosUrl: string[];
  hashtags: string[];
  collaborators: string;
  createdAt: string;
  viewCount: number;
}
