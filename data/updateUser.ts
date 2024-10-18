"use server"
import { db } from "@/lib/db";
import { User } from "@prisma/client";

export const updateUserInformations = async (
    data : User,
) => {
  try {    

    const updatedUser = await db.user.update({
      where: { id: data.id }, 
      data
    });

    return { updatedUser, success: "Informations updated", error: null };

  } catch (error) {
    console.error('Erro ao atualizar as informações:', error);
    return { success: null, error: "Erro ao atualizar as informações." };
  }
};
