"use server";
import { storePost } from "@/lib/posts";
import { redirect } from "next/navigation";
import uploadImage from "./aws";
export async function createPost(prevState, formData) {
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");
  let errors = [];
  let imageUrl;
  if (!title || title.trim().length === 0) {
    errors.push("Title is required");
  }
  if (!image || image.size === 0) {
    errors.push("Image is required");
  }
  if (!content || content.trim().length === 0) {
    errors.push("Content is required");
  }
  if (errors.length > 0) {
    return { errors };
  }

  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error(
      "Failed to upload image, Post cannot be created, please try again later."
    );
  }
  await storePost({
    imageUrl: imageUrl,
    title,
    content,
    userId: 1,
  });
  redirect("/feed");
}
