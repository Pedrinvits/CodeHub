"use server"
import { db } from "@/lib/db";

export const deleteComment  = async (

    commentId: number

) => {
  try {

    await db.coment.delete({
        where: { id: commentId },
      });

    return { success: true, error: null };
  } catch (error) {
    console.error('Erro ao atualizar as informações:', error);
    return { success: null, error: "Erro ao atualizar as informações." };
  }
};
