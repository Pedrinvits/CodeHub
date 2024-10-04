"use server";
import { db } from "@/lib/db";

export const updateLikes = async (
  post_id: number,
  user_id: number, 
) => {
  try {

    // Verifique se o usuário já deu like no post
    const existingLike = await db.postLike.findMany({
      where: {
        postId: post_id,
        userId: user_id,
      },
    });
    
    const val = existingLike.length > 0;

    if (val) {
      // Se já existe um like, remova o like e diminua o número de likes
      await db.postLike.delete({
        where: {
          id: existingLike[0].id, 
        },
      });

      const updatedPost = await db.post.update({
        where: { id: post_id },
        data: {
          likes: { decrement: 1 },
        },
      });

      return { updatedPost, message: "Like removido com sucesso", error: null };
      
    } else {
      // Se não existe um like, adicione o like e aumente o número de likes
      await db.postLike.create({
        data: {
          postId: post_id,
          userId: user_id,
        },
      });

      const updatedPost = await db.post.update({
        where: { id: post_id },
        data: {
          likes: { increment: 1 },
        },
      });

      return { updatedPost, message: "Like adicionado com sucesso", error: null };
    }
  } catch (error) {
    console.error('Erro ao atualizar as informações:', error);
    return { success: null, error: "Erro ao atualizar as informações." };
  }
};
