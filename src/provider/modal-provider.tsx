import type { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import PostEditorModal from "@/components/modal/post-editor-modal";

export default function ModalProvider({ children }: PropsWithChildren) {
  return (
    <>
      {createPortal(
        <PostEditorModal />,
        document.getElementById("modal-root")!,
      )}
      {children}
    </>
  );
}
