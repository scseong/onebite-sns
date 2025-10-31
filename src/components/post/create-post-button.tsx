import { PlusCircleIcon } from "lucide-react";
import { useOpenPostEditorModal } from "@/store/post-editor-modal";

export default function CreatePostButton() {
  const openPostEditorModal = useOpenPostEditorModal();

  return (
    <div
      className="bg-muted text-muted-foreground cursor-pointer rounded-xl px-6 py-4"
      onClick={openPostEditorModal}
    >
      <div className="flex items-center justify-between">
        <div>나누고 싶은 이야기가 있나요?</div>
        <PlusCircleIcon className="2-5 h-5" />
      </div>
    </div>
  );
}
