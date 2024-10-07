"use server"
import { db } from "@/lib/db";
import { auth } from "../auth";
import { getUserByEmail } from "./user";

export const editpost = async (
    post_id: number,
    title : string,
    description : string
) => {
  try {
    // Autenticação para obter a sessão e o ID do usuário
    const session = await auth();
    const authorId = session?.user?.email;

    // Obtenção do usuário pelo e-mail
    const user = await getUserByEmail(authorId as any);

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const updatePost = await db.post.update({
        where : {
            id : post_id
        },data : {
            title,
            description
        }
    });

    // cria o post e depois manda os posts atualizados
    const updatedPosts = await db.post.findMany()

    return { updatedPosts, success: "Informações atualizadas com sucesso!", error: null };
  } catch (error) {
    console.error('Erro ao atualizar as informações:', error);
    return { success: null, error: "Erro ao atualizar as informações." };
  }
};
