import { NextRequest, NextResponse } from "next/server";
import ImageService from "@/server/services/Image.service";
import HttpError from "@/server/errors/HttpError";
import requestHandler from "@/server/handlers/RequestHandler";
import { getCatalystApp } from "@/server/utils/GetCatalystApp";

async function getPagedImages(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const page = Number(searchParams.get("page"));
    const perPage = Number(searchParams.get("perPage"));

    if (!page) throw new HttpError(400, "page cannot be empty.");
    if (!perPage) throw new HttpError(400, "perPage cannot be empty.");

    if (isNaN(page) || page <= 0) {
      throw new HttpError(400, "page must be a positive integer.");
    }

    if (isNaN(perPage) || perPage <= 0) {
      throw new HttpError(400, "perPage must be a positive integer.");
    }

    if (perPage > 100) {
      throw new HttpError(400, "perPage cannot be greater than 100.");
    }

    const catalystApp = getCatalystApp(request);

    const imageService = new ImageService(catalystApp);

    const pagedResult = await imageService.getPagedImages({
      page,
      perPage
    });

   return NextResponse.json({
      status: "success",
      data: pagedResult.data,
      pageInfo: pagedResult.pageInfo
    });
  
}

export const revalidate = 0;
export const GET= requestHandler(getPagedImages);