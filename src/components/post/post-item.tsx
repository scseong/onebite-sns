import { HeartIcon, MessageCircle } from "lucide-react";
import { useIsMine } from "@/store/session";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import EditPostButton from "@/components/post/edit-post-button";
import DeletePostButton from "@/components/post/delete-post-button";
import { formatTimeAgo } from "@/lib/time";
import defaultAvatar from "@/assets/default-avatar.jpg";
import { usePostByIdData } from "@/hooks/queries/use-post-by-id-data";
import Loader from "@/components/loader";
import Fallback from "@/components/fallback";

export default function PostItem({ postId }: { postId: number }) {
  const {
    data: post,
    isPending,
    error,
  } = usePostByIdData({ postId, type: "FEED" });

  const isMine = useIsMine(post?.author_id);

  if (isPending) return <Loader />;
  if (error) return <Fallback />;

  return (
    <div className="flex flex-col gap-4 border-b pb-8">
      <div className="flex justify-between">
        <div className="flex items-start gap-4">
          <img
            src={post.author.avatar_url || defaultAvatar}
            alt={`${post.author.nickname}의 프로필 이미지`}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <div className="font-bold hover:underline">
              {post.author.nickname}
            </div>
            <div className="text-muted-foreground text-sm">
              {formatTimeAgo(post.created_at)}
            </div>
          </div>
        </div>

        <div className="text-muted-foreground flex text-sm">
          {isMine && (
            <>
              <EditPostButton {...post} />
              <DeletePostButton id={post.id} />
            </>
          )}
        </div>
      </div>

      <div className="flex cursor-pointer flex-col gap-5">
        <div className="line-clamp-2 break-words whitespace-pre-wrap">
          {post.content}
        </div>

        <Carousel>
          <CarouselContent>
            {post.image_urls?.map((url, index) => (
              <CarouselItem className={`basis-3/5`} key={index}>
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={url}
                    className="h-full max-h-[350px] w-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="flex gap-2">
        <div className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border-1 p-2 px-4 text-sm">
          <HeartIcon className="h-4 w-4" />
          <span>0</span>
        </div>

        <div className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border-1 p-2 px-4 text-sm">
          <MessageCircle className="h-4 w-4" />
          <span>댓글 달기</span>
        </div>
      </div>
    </div>
  );
}
