import supabase from "@/lib/supabase";
import { uploadImage } from "./image";
import type { PostEntity } from "@/types/types";

export async function fetchPosts({ from, to }: { from: number; to: number }) {
  const { data, error } = await supabase
    .from("post")
    .select("*, author: profile!author_id (*)")
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;
  return data;
}

export async function fetchPostById(postId: number) {
  const { data, error } = await supabase
    .from("post")
    .select("*, author: profile!author_id (*)")
    .eq("id", postId)
    .single();

  if (error) throw error;
  return data;
}

export async function createPost(content: string) {
  const { data, error } = await supabase
    .from("post")
    .insert({
      content,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createPostWithImages({
  content,
  images,
  userId,
}: {
  content: string;
  images: File[];
  userId: string;
}) {
  const post = await createPost(content);

  if (images.length === 0) return post;

  try {
    const imageUrls = await Promise.all(
      images.map((image) => {
        const fileExtension = image.name.split(".").pop() || "webp";
        const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
        const filePath = `${userId}/${post.id}/${fileName}`;

        return uploadImage({ file: image, filePath });
      }),
    );

    const updatedPost = await updatePost({
      id: post.id,
      image_urls: imageUrls,
    });

    return updatedPost;
  } catch (error) {
    await deletePost(post.id);
    throw error;
  }
}

export async function updatePost(post: Partial<PostEntity> & { id: number }) {
  const { data, error } = await supabase
    .from("post")
    .update(post)
    .eq("id", post.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePost(id: number) {
  const { data, error } = await supabase
    .from("post")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
