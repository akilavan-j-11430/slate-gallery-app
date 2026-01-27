import catalyst from "zcatalyst-sdk-node";
import { NextRequest } from "next/server";

export function getCatalystApp(request: NextRequest) {
  const headers: Record<string, string> = {};

  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  return catalyst.initialize({
    headers
  });
}