import { getPagedImages } from "@/client/services/image.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function usePagedImages() {
  const {
    data: _data,
    error,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ["paged","images"],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1, signal }) =>
      getPagedImages({
        page: pageParam,
        perPage: 50,
        signal
      }),
    retry: false,
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.hasMore ? lastPage.pageInfo.page + 1 : undefined
  });

  const data = _data?.pages.flatMap((page) => page.data) ?? [];

  return {
    data,
    error,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  };
}
