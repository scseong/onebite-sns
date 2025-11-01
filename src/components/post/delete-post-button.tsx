import { useOpenAlertModal } from "@/store/alert-modal";
import { useDeletePost } from "@/hooks/mutations/post/use-delete-post";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export default function DeletePostButton({ id }: { id: number }) {
  const openAlertModal = useOpenAlertModal();
  const { showErrorToast } = useToast();

  const { mutate: deletePost, isPending: isDeletePostPending } = useDeletePost({
    onError: () => showErrorToast("포스트 삭제에 실패했습니다."),
  });

  const handleDeleteClick = () => {
    openAlertModal({
      title: "포스트 삭제",
      description: "삭제된 포스트는 되돌릴 수 없습니다. 정말 삭제하시겠습니까?",
      onPositive: () => deletePost(id),
    });
  };

  return (
    <Button
      className="cursor-pointer"
      onClick={handleDeleteClick}
      variant="ghost"
      disabled={isDeletePostPending}
    >
      삭제
    </Button>
  );
}
