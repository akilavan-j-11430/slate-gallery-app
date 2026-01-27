import {Readable} from "stream";

export type ImageModel = {
  ROWID: string;
  NAME: string;
  FILE_NAME: string;
  CREATEDTIME: string;
};

export type CreateImageModel = {
  name: string;
  mimeType: string;
  stream: Readable;
};

export type UpdateImageModel = {
  id: string;
  content: string;
};

export type ImageFilters = {
  name?: string;
};

export type GetPagedImages = {
  page: number;
  perPage: number;
  filters?: ImageFilters;
};

export type GetImagesByLimit = {
  limit: number;
  offset: number;
  filters?: ImageFilters;
};
