import { HeartIcon } from "lucide-react";
import useTogglePostLike from "@/hooks/mutations/post/use-toggle-post-like";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@/store/session";

export default function LikePostButton({
  id,
  likeCount,
}: {
  id: number;
  likeCount: number;
}) {
  const { showErrorToast } = useToast();
  const session = useSession();

  const { mutate: togglePostLike } = useTogglePostLike({
    onError: () => showErrorToast("좋아요 요청에 실패했습니다."),
  });

  const handleLikeClick = () => {
    togglePostLike({
      postId: id,
      userId: session!.user.id,
    });
  };

  return (
    <div
      className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border-1 p-2 px-4 text-sm"
      onClick={handleLikeClick}
    >
      <HeartIcon className="h-4 w-4" />
      <span>{likeCount}</span>
    </div>
  );
}
