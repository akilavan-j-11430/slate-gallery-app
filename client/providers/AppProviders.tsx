"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "@/client/shadcn/components/ui/sonner";
import { handleError } from "@/client/handlers/ErrorHandler";

export default function AppProviders({
  children
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            handleError(error);
          }
        }),
        mutationCache: new MutationCache({
          onError: (error) => {
            handleError(error);
          }
        })
      })
  );

  return (
    <>
      <Toaster position="top-center" />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}
