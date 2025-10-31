import PostFeed from "@/components/post/post-feed";
import CreatePostButton from "@/components/post/create-post-button";

export default function IndexPage() {
  return (
    <div className="flex flex-col gap-10">
      <CreatePostButton />
      <PostFeed />
    </div>
  );
}
