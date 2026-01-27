import { NextRequest, NextResponse } from "next/server";
import ImageService from "@/server/services/Image.service";
import HttpError from "@/server/errors/HttpError";
import { getCatalystApp } from "@/server/utils/GetCatalystApp";
import { Readable } from "stream";
import type { ReadableStream as WebReadableStream } from "stream/web";

async function uploadImage(request: NextRequest) {
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const file = formData.get("file") as File;

  if (!name) throw new HttpError(400, "name cannot be empty.");
  if (!file) throw new HttpError(400, "file cannot be empty.");

  if (!["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
    throw new HttpError(
      400,
      "Invalid value for file. Only png, jpg, and jpeg are allowed."
    );
  }

  const webStream = file.stream() as unknown as WebReadableStream<Uint8Array>;
  const nodeStream = Readable.fromWeb(webStream);
  const catalystApp = getCatalystApp(request);

  const imageService = new ImageService(catalystApp);

  const image = await imageService.createImage({
    name,
    stream: nodeStream,
    mimeType: file.type
  });

  return NextResponse.json({ status: "success", data: image }, { status: 201 });
}

export const POST = uploadImage;
