export type Image = {
  NAME: string;
  ROWID: string;
  FILE_NAME: string;
  CREATEDTIME: string;
};

export type GetPagedImagesParams = {
  page: number;
  perPage: number;
  signal?: AbortSignal;
};

export type UploadImageParams = {
  name: string;
  file: File;
};
