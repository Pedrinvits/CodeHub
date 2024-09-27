"use server"
import { db } from "@/lib/db";
import { auth } from "../auth";
import { getUserByEmail,getUserById } from "./user";

export const updateUserName = async (
    name : string,
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

    // Atualizando as informações do usuário no banco de dados
    const updatedUser = await db.user.update({
      where: { id: user.id }, // Atualiza o usuário baseado no ID
      data: {
        name : name
      },
    });

    // console.log('Informações atualizadas:', updatedUser);

    return { success: "Nome alterado com sucesso!", error: null };

  } catch (error) {
    console.error('Erro ao atualizar as informações:', error);
    return { success: null, error: "Erro ao atualizar as informações." };
  }
};
