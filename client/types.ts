export type ServerPagedResult<T> = {
  data: T[];
  pageInfo: {
    page: number;
    perPage: number;
    hasMore: boolean;
  };
};

export type ServerResult<T> = {
  data: T;
};
