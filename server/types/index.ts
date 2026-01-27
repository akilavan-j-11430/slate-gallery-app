
import { Readable } from "stream";

export type Undefined<T> = T | undefined;

export type PageInfo = {
  page: number;
  perPage: number;
  hasMore: boolean;
};

export type PagedResult<T> = {
  data: T[];
  pageInfo: PageInfo;
};

export type FileResult = {
  stream: Readable;
  fileName: string;
  mimeType: string;
};
