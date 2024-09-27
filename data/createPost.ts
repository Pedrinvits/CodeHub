"use server"
import { db } from "@/lib/db";
import { auth } from "../auth";
import { getUserByEmail } from "./user";

export const createInformations = async (
  salary: number, 
  education: string, 
  creditCards: number, 
  debts: number, 
  savings: number
) => {
  try {
    // Autenticação para obter a sessão e o ID do usuário
    const session = await auth();
    const authorId = session?.user?.email;

    // Obtenção do usuário pelo e-mail
    const user = await getUserByEmail(authorId);

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    // Atualizando as informações do usuário no banco de dados
    const updatedUser = await db.user.update({
      where: { id: user.id }, // Atualiza o usuário baseado no ID
      data: {
        salary: salary,
        education: education,
        creditCards: creditCards,
        debts: debts,
        savings: savings,
      },
    });

    console.log('Informações atualizadas:', updatedUser);

    return { success: "Informações atualizadas com sucesso!", error: null };
  } catch (error) {
    console.error('Erro ao atualizar as informações:', error);
    return { success: null, error: "Erro ao atualizar as informações." };
  }
};
