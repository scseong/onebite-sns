import { useState, useRef, useEffect, type ChangeEvent } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ImageIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { usePostEditorModal } from "@/store/post-editor-modal";
import { useOpenAlertModal } from "@/store/alert-modal";
import { useSession } from "@/store/session";
import { useCreatePost } from "@/hooks/mutations/post/use-create-post";
import { useUpdatePost } from "@/hooks/mutations/post/use-update-post";
import { useToast } from "@/hooks/use-toast";

type Image = {
  file: File;
  previewUrl: string;
};

export default function PostEditorModal() {
  const session = useSession();
  const [content, setContent] = useState("");
  const [images, setImages] = useState<Image[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { showErrorToast } = useToast();
  const postEditorModal = usePostEditorModal();
  const {
    isOpen,
    actions: { close },
  } = postEditorModal;
  const openAlertModal = useOpenAlertModal();

  const { mutate: updatePost, isPending: isUpdatePostPending } = useUpdatePost({
    onSuccess: () => close(),
    onError: () => showErrorToast("포스트 수정에 실패했습니다."),
  });

  const { mutate: createPost, isPending: isCreatePostPending } = useCreatePost({
    onSuccess: () => close(),
    onError: () => showErrorToast("포스트 생성에 실패했습니다."),
  });

  const handleCloseModal = () => {
    if (content !== "" || images.length !== 0) {
      openAlertModal({
        title: "게시글 작성이 마무리 되지 않았습니다.",
        description: "이 화면에서 나가면 작성중이던 내용이 사라집니다.",
        onPositive: () => close(),
      });

      return;
    }

    close();
  };

  const handleSavePostClick = () => {
    if (content.trim() === "") return;

    if (!isOpen) return;
    if (postEditorModal.type === "CREATE") {
      createPost({
        content,
        images: images.map((image) => image.file),
        userId: session!.user.id,
      });
    } else {
      if (content === postEditorModal.content) return;
      updatePost({
        id: postEditorModal.postId,
        content,
      });
    }
  };

  const handleSelectImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      files.forEach((file) => {
        setImages((prev) => [
          ...prev,
          { file, previewUrl: URL.createObjectURL(file) },
        ]);
      });
    }

    e.target.value = "";
  };

  const handleDeleteImage = (image: Image) => {
    setImages((prevImages) =>
      prevImages.filter((item) => item.previewUrl !== image.previewUrl),
    );

    URL.revokeObjectURL(image.previewUrl);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  useEffect(() => {
    if (!isOpen) {
      images.forEach((image) => URL.revokeObjectURL(image.previewUrl));
      return;
    }

    if (postEditorModal.type === "CREATE") {
      setContent("");
      setImages([]);
    } else {
      setContent(postEditorModal.content);
      setImages([]);
    }

    textareaRef.current?.focus();
  }, [isOpen]);

  const isPending = isCreatePostPending || isUpdatePostPending;

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="flex max-h-[90vh] flex-col">
        <DialogTitle>포스트 작성</DialogTitle>
        <textarea
          className="max-h-125 min-h-25 flex-grow resize-none overflow-y-auto rounded-md border-1 p-2 focus:outline-none"
          ref={textareaRef}
          placeholder="무슨 일이 있었나요?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isPending}
        />
        <input
          className="hidden"
          ref={fileInputRef}
          onChange={handleSelectImages}
          type="file"
          accept="image/*"
          multiple
        />
        {isOpen && postEditorModal.type === "EDIT" && (
          <Carousel>
            <CarouselContent>
              {postEditorModal.imageUrls?.map((url) => (
                <CarouselItem className="basis-2/5" key={url}>
                  <div className="relative">
                    <img
                      className="h-full w-full rounded-sm object-cover"
                      src={url}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
        {images.length > 0 && (
          <Carousel>
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem className="basis-2/5" key={image.previewUrl}>
                  <div className="relative">
                    <img
                      className="h-full w-full rounded-sm object-cover"
                      src={image.previewUrl}
                      alt=""
                    />
                    <div
                      className="absolute top-0 right-0 m-1 cursor-pointer rounded-full bg-black/30 p-1"
                      onClick={() => handleDeleteImage(image)}
                    >
                      <XIcon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
        {isOpen && postEditorModal.type === "CREATE" && (
          <Button
            className="cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            disabled={isPending}
          >
            <ImageIcon />
            이미지 추가
          </Button>
        )}
        <Button
          className="cursor-pointer"
          onClick={handleSavePostClick}
          disabled={isPending}
        >
          저장
        </Button>
      </DialogContent>
    </Dialog>
  );
}
