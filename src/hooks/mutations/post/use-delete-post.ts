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

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.post.list,
      });

      queryClient.removeQueries({
        queryKey: QUERY_KEYS.post.byId(deletedPost.id),
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
