"use client";

import Image from "next/image";
import usePagedImages from "@/client/hooks/usePagedImages";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/client/shadcn/components/ui/card";
import Button from "@/client/components/Button";
import UploadImageModal from "@/client/components/UploadImageModal";
import useModalState from "@/client/hooks/useModalState";
import { useIntersectionObserver } from "usehooks-ts";
import { useEffect } from "react";

export default function ImageView() {
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage
  } = usePagedImages();
  const modalState = useModalState();

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.5
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <header className="h-16 border-b border-border px-6 flex items-center justify-between">
        <p className="text-4xl font-semibold text-primary">Gallery</p>
        <Button label="Upload" onClick={modalState.openModal} />
      </header>
      <main className="p-4 h-[calc(100vh-64px)] overflow-y-auto">
        {isLoading || error ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-lg text-muted-foreground">Loading images...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-lg text-muted-foreground">No images found.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.map((image) => (
                <Card key={image.ROWID}>
                  <CardHeader>
                    <CardTitle className="truncate">{image.NAME}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={`/api/images/${image.ROWID}/download`}
                      alt={`Image ${image.ROWID}`}
                      unoptimized
                      width={400}
                      height={100}
                      className="w-full h-48 object-scale-down rounded-md"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
            <div ref={ref} className="h-10" />

            {isFetchingNextPage && (
              <p className="text-center text-sm text-muted-foreground py-4">
                Loading more…
              </p>
            )}
          </>
        )}
        <UploadImageModal
          open={modalState.isOpen}
          onClose={modalState.closeModal}
        />
      </main>
    </>
  );
}
