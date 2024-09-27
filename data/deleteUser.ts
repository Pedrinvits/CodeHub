"use server"
import { db } from "@/lib/db";
import { auth } from "../auth";
import { getUserByEmail,getUserById } from "./user";

export const deleteUser = async (
) => {
  try {
    const session = await auth();
    const authorId = session?.id;

    // Obtenção do usuário pelo e-mail
    const user = await getUserById(parseInt(authorId));

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    // Atualizando as informações do usuário no banco de dados
    const updatedUser = await db.user.delete({
      where: { id: user.id } // Atualiza o usuário baseado no ID
    });

    // console.log('Informações atualizadas:', updatedUser);

    return { success: "Conta apagada com sucesso!", error: null };
    
  } catch (error) {
    console.error('Erro ao atualizar as informações:', error);
    return { success: null, error: "Erro ao atualizar as informações." };
  }
};
