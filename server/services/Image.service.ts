import { v4 as uuid } from "uuid";
import mime from "mime-types";

import {
  ImageModel,
  CreateImageModel,
  ImageFilters,
  GetPagedImages,
  GetImagesByLimit
} from "@/server/services/Image.types";
import ImageModule from "@/server/modules/ImageModule";
import { FileResult, PagedResult, Undefined } from "@/server/types";
import { CatalystApp } from "zcatalyst-sdk-node/lib/catalyst-app";

export default class ImageService {
  protected catalystApp: CatalystApp;

  constructor(catalystApp: CatalystApp) {
    this.catalystApp = catalystApp;
  }

  protected async getImagesByLimit({
    limit,
    offset,
    filters = {}
  }: GetImagesByLimit): Promise<ImageModel[]> {
    const zcql = this.catalystApp.zcql();

    let criteria = "";

    if (filters.name) {
      criteria += `${ImageModule.Table.Fields.NAME} LIKE '%${filters.name}%'`;
    }

    const query = `SELECT ${ImageModule.Table.Fields.ROWID},${ImageModule.Table.Fields.NAME},${ImageModule.Table.Fields.FILE_NAME},${ImageModule.Table.Fields.CREATEDTIME} FROM ${ImageModule.Table.Name} ${criteria ? `WHERE ${criteria}` : ""} ORDER BY ${ImageModule.Table.Fields.CREATEDTIME} DESC LIMIT ${limit} OFFSET ${offset}`;
    const results = await zcql.executeZCQLQuery(query);

    return results.map((row) => row[ImageModule.Table.Name]) as ImageModel[];
  }

  public async getCount(filters: ImageFilters = {}): Promise<number> {
    const zcql = this.catalystApp.zcql();

    let criteria = "";

    if (filters.name) {
      criteria += `${ImageModule.Table.Fields.NAME} LIKE '%${filters.name}%'`;
    }

    const countColumn = `COUNT(${ImageModule.Table.Fields.ROWID})`;

    const query = `SELECT ${countColumn} FROM ${ImageModule.Table.Name} ${criteria ? `WHERE ${criteria}` : ""}`;
    const results = await zcql.executeZCQLQuery(query);
    const count = parseInt(results[0][ImageModule.Table.Name][countColumn]);
    return count;
  }

  public async getPagedImages({
    page,
    perPage,
    filters = {}
  }: GetPagedImages): Promise<PagedResult<ImageModel>> {
    const offset = (page - 1) * perPage;
    const data = await this.getImagesByLimit({
      limit: perPage,
      offset,
      filters
    });

    const totalCount = await this.getCount(filters);
    const hasMore = page * perPage < totalCount;

    return {
      data,
      pageInfo: {
        page,
        perPage,
        hasMore
      }
    };
  }

  public async findImage(id: string): Promise<Undefined<ImageModel>> {
    const table = this.catalystApp.datastore().table(ImageModule.Table.Name);

    try {
      const image = await table.getRow(id);
      return {
        ROWID: image[ImageModule.Table.Fields.ROWID],
        NAME: image[ImageModule.Table.Fields.NAME],
        FILE_NAME: image[ImageModule.Table.Fields.FILE_NAME],
        CREATEDTIME: image[ImageModule.Table.Fields.CREATEDTIME]
      };
    } catch {
      return undefined;
    }
  }

  public async createImage({
    name,
    stream,
    mimeType
  }: CreateImageModel): Promise<ImageModel> {
    const table = this.catalystApp.datastore().table(ImageModule.Table.Name);
    const bucket = this.catalystApp.stratus().bucket(ImageModule.Bucket.Name);
    const fileName = `${uuid()}.${mime.extension(mimeType) || "png"}`;

    console.log("Uploading file to bucket:", ImageModule.Bucket.Name);
    await bucket.putObject(fileName, stream);

    const { ROWID, CREATEDTIME } = await table.insertRow({
      [ImageModule.Table.Fields.NAME]: name,
      [ImageModule.Table.Fields.FILE_NAME]: fileName
    });

    return {
      ROWID,
      NAME: name,
      FILE_NAME: fileName,
      CREATEDTIME
    };
  }

  public async getImage(fileName: string): Promise<FileResult> {
    const bucket = this.catalystApp.stratus().bucket(ImageModule.Bucket.Name);
    const stream = await bucket.getObject(fileName);

    return {
      stream,
      fileName,
      mimeType: mime.lookup(fileName) || "image/png"
    };
  }
}
