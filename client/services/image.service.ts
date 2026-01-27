import axios from "axios";

import {
  GetPagedImagesParams,
  Image,
  UploadImageParams
} from "@/client/services/image.types";
import { ServerPagedResult, ServerResult } from "@/client/types";

export async function getPagedImages({
  page,
  signal,
  perPage
}: GetPagedImagesParams): Promise<ServerPagedResult<Image>> {
  return axios
    .get("/api/images", {
      params: {
        page,
        perPage
      },
      signal
    })
    .then((res) => res.data as ServerPagedResult<Image>)
    
}

export async function uploadImage({
  file,
  name
}: UploadImageParams): Promise<ServerResult<Image>> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", name);

  return axios
    .post("/api/images/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((res) => res.data as ServerResult<Image>);
}
