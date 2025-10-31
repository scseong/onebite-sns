import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";

const PAGE_SIZE = 5;

export function useInfinitePostData() {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.post.list,
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const posts = await fetchPosts({ from, to });
      return posts;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length;
    },
  });
}
