import { useOpenEditPostModal } from "@/store/post-editor-modal";
import { Button } from "@/components/ui/button";
import type { PostEntity } from "@/types/types";

export default function EditPostItemButton(props: PostEntity) {
  const { content, id: postId, image_urls } = props;
  const openPostEditorModal = useOpenEditPostModal();

  const handleButtonClick = () => {
    openPostEditorModal({
      postId: postId,
      content,
      imageUrls: image_urls,
    });
  };

  return (
    <Button
      className="cursor-pointer"
      onClick={handleButtonClick}
      variant="ghost"
    >
      수정
    </Button>
  );
}
