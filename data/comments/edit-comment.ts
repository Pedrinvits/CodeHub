"use server"
import { db } from "@/lib/db";

export const editComments = async (

    commentId: number, updatedComent: string

) => {
  try {

    const updatedComment = await db.coment.update({
        where: { id: commentId },
        data: { coment: updatedComent, updated_at: new Date() },
      });

    return { comment:updatedComment, success: "Comentário criado com sucesso!", error: null };
  } catch (error) {
    console.error('Erro ao atualizar as informações:', error);
    return { success: null, error: "Erro ao atualizar as informações." };
  }
};
