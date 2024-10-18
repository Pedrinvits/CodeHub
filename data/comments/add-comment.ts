"use server";
import { db } from "@/lib/db";

export const createComments = async (
  post_id: number, 
  coment: string, 
  userId: number // Adiciona o userId como argumento
) => {
  try {
 
    const newComment = await db.coment.create({
      data: {
        coment : coment,
        post_id : post_id,
        userId : userId, 
      },
      include : {
        user : {
          select : {
            username : true,
            name : true,
            profileImageUrl : true,
          }
        }
      }
    });

    return { comment: newComment, success: "Comentário criado com sucesso!", error: null };

  } catch (error) {
    console.error('Erro ao criar comentário:', error);
  }
};
