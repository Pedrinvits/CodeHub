"use server"
import { db } from "@/lib/db";
import { auth } from "../auth";
import { getUserByEmail } from "./user";

export const deletepost = async (post_id: number) => {
  try {
    await db.$transaction([
      db.commentLike.deleteMany({
        where: {
          coment: {
            post: {
              id: post_id
            }
          }
        }
      }),
      db.postLike.deleteMany({
        where: {
          postId: post_id
        }
      }),
      db.savedPost.deleteMany({
        where: {
          postId: post_id
        }
      }),
      db.post.delete({
        where: {
          id: post_id
        }
      })
    ]);

    return { success: "Post deletado com sucesso!", error: null };
  } catch (error) {
    console.error('Erro ao deletar post:', error);
    return { success: null, error: "Erro ao deletar o post." };
  }
};
