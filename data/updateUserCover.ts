"use server"
import { db } from "@/lib/db";
import { auth } from "../auth";
import { getUserByEmail,getUserById } from "./user";

export const updateUserCover = async (
    coverImageUrl : string,
) => {
  try {    
    // Autenticação para obter a sessão e o ID do usuário
    const session = await auth();
    const authorId = session?.id;

    // Obtenção do usuário pelo e-mail
    const user = await getUserById(parseInt(authorId));

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

     await db.user.update({
      where: { id: user.id }, 
      data: {
        coverImageUrl
      },
    });


    return { success: "Imagem de fundo alterada com sucesso!", error: null };

  } catch (error) {
    console.error('Erro ao atualizar as informações:', error);
    return { success: null, error: "Erro ao atualizar as informações." };
  }
};
