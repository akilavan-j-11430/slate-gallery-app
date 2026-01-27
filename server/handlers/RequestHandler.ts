import { NextRequest, NextResponse } from "next/server";
import HttpError from "@/server/errors/HttpError";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RouteHandler<TParams =any> = (
  request: NextRequest,
  context: { params?: TParams }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => Promise<NextResponse<any>>;

export default function requestHandler<TParams = unknown>(
  handler: RouteHandler<TParams>
) {
  return async (
    request: NextRequest,
    context: { params?: TParams }
  ): Promise<NextResponse> => {
    try {
      return await handler(request, context);
    } catch (error: unknown) {
      const defaultMessage =
        "We're unable to process your request at the moment. Please try again later.";

      if (error instanceof HttpError) {
        return NextResponse.json(
          {
            status: "failure",
            message: error.message,
          },
          {
            status: error.statusCode, 
          }
        );
      }

      console.error("Unhandled error:", error);

      return NextResponse.json(
        {
          status: "failure",
          message: defaultMessage,
        },
        {
          status: 500,
        }
      );
    }
  };
}
