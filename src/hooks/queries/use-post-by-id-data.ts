import { useQuery } from "@tanstack/react-query";
import { fetchPostById } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";

export function usePostByIdData({
  postId,
  type,
}: {
  postId: number;
  type: "FEED" | "DETAIL";
}) {
  return useQuery({
    queryKey: QUERY_KEYS.post.byId(postId),
    queryFn: () => fetchPostById(postId),
    enabled: type === "FEED" ? false : true,
  });
}
