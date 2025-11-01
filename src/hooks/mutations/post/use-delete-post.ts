import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { deletePost } from "@/api/post";
import { deleteImagesInPath } from "@/api/image";
import { QUERY_KEYS } from "@/lib/constants";
import type { UseMutationCallback } from "@/types/types";

export function useDeletePost(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletedPost) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      if (deletedPost.image_urls && deletedPost.image_urls.length > 0)
        await deleteImagesInPath(`${deletedPost.author_id}/${deletedPost.id}`);

      queryClient.setQueryData<InfiniteData<number[]>>(
        QUERY_KEYS.post.list,
        (prev) => {
          if (!prev)
            throw new Error(
              "포스트 리스트를 캐시 데이터에서 찾을 수 없습니다.",
            );

          return {
            ...prev,
            pages: prev.pages.map((page) => {
              if (page.includes(deletedPost.id)) {
                return page.filter((id) => id !== deletedPost.id);
              }

              return page;
            }),
          };
        },
      );

      queryClient.removeQueries({
        queryKey: QUERY_KEYS.post.byId(deletedPost.id),
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
