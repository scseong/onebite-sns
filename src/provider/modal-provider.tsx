import type { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import PostEditorModal from "@/components/modal/post-editor-modal";
import AlertModal from "@/components/modal/alert-modal";

export default function ModalProvider({ children }: PropsWithChildren) {
  return (
    <>
      {createPortal(
        <>
          <PostEditorModal />
          <AlertModal />
        </>,
        document.getElementById("modal-root")!,
      )}
      {children}
    </>
  );
}
