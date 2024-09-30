"use server"
import { db } from "@/lib/db";
import { auth } from "../auth";
import { getUserByEmail } from "./user";

export const deletepost = async (

  post_id: number

) => {
  try {
    
    const deletePost = await db.post.delete({
        where : {
            id : post_id
        }
    })

    return { success: "Post deletado com sucesso!", error: null };
  } catch (error) {
    console.error('Erro ao atualizar as informações:', error);
    return { success: null, error: "Erro ao atualizar as informações." };
  }
};
