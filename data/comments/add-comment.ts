"use server"
import { db } from "@/lib/db";

export const createComments = async (

    post_id: number, coment: string

) => {
  try {

    const newComment = await db.coment.create({
        data : {
            coment,
            post_id,
        }
    })

    return { comment:newComment, success: "Comentário criado com sucesso!", error: null };
  } catch (error) {
    console.error('Erro ao atualizar as informações:', error);
    return { success: null, error: "Erro ao atualizar as informações." };
  }
};
