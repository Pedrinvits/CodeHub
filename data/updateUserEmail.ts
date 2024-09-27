"use server"
import { db } from "@/lib/db";
import { auth } from "../auth";
import { getUserByEmail,getUserById } from "./user";

export const updateUserEmail = async (
    email : string,
) => {
  try {
    // Autenticação para obter a sessão e o ID do usuário
    const session = await auth();
    const authorId = session?.id;

    // Obtenção do usuário pelo e-mail
    const user = await getUserById(parseInt(authorId));

    const existingUser = await getUserByEmail(email);

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }
    
    if(existingUser) {
      return {
          error : "Esse email já está sendo usado!"
      };
  }
    // Atualizando as informações do usuário no banco de dados
    const updateUserEmail = await db.user.update({
      where: { id: user.id }, // Atualiza o usuário baseado no ID
      data: {
        email : email
      },
    });

    // console.log('Informações atualizadas:', updatedUser);

    return { success: "Email com sucesso!", error: null };
  } catch (error) {
    console.error('Erro ao atualizar as informações:', error);
    return { success: null, error: "Erro ao atualizar as informações." };
  }
};
