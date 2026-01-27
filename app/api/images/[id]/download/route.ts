import { NextRequest, NextResponse } from "next/server";
import ImageService from "@/server/services/Image.service";
import HttpError from "@/server/errors/HttpError";
import { getCatalystApp } from "@/server/utils/GetCatalystApp";
import requestHandler from "@/server/handlers/RequestHandler";

async function downloadImage(
  request: NextRequest,
   context: { params?: Promise<{ id: string }> }
): Promise<NextResponse> {
   const params = await context.params;
  const imageId = params?.id;

  if (!imageId) {
    throw new HttpError(400, "Invalid value for image ID.");
  }

  const catalystApp = getCatalystApp(request);
  const imageService = new ImageService(catalystApp);

  const image = await imageService.findImage(imageId);

  if (!image) {
    throw new HttpError(
      404,
      "We couldn't find the requested image on the server."
    );
  }

  const fileResult = await imageService.getImage(image.FILE_NAME);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new NextResponse(fileResult.stream as any, {
    headers: {
      "Content-Disposition": `inline; filename="${image.NAME}"`,
      "Content-Type": fileResult.mimeType
    }
  });
}

export const GET = requestHandler(downloadImage);
