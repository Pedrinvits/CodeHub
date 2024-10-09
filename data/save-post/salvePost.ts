"use server";
import { db } from "@/lib/db";
import { auth } from "../../auth";
import { getUserByEmail } from "../user";

export const updateSavedPosts = async (
  postId: number
) => {
  try {
  
    const session = await auth();
    const authorEmail = session?.user?.email;

    if (!authorEmail) {
      throw new Error("Usuário não autenticado.");
    }

   
    const user = await getUserByEmail(authorEmail);

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    
    const existingSave = await db.savedPost.findMany({
      where: {
        postId,
        userId: user.id,
      },
    });

    const isPostSaved = existingSave.length > 0;

    if (isPostSaved) {
     
      await db.savedPost.delete({
        where: {
          id: existingSave[0].id,
        },
      });

      await db.post.update({
        where: { id: postId },
        data: {
          saves: { decrement: 1 },
        },
      });

      return { sucess: "Post removido dos salvos com sucesso", error: null };

    } else {
    
      await db.savedPost.create({
        data: {
          postId,
          userId: user.id,
        },
      });

      await db.post.update({
        where: { id: postId },
        data: {
          saves: { increment: 1 },
        },
      });

      return { sucess: "Post salvo com sucesso", error: null };
    }
  } catch (error) {
    return { success: null, error: "Erro ao atualizar as informações"};
  }
};
