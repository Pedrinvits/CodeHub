"use server"
import { db } from "@/lib/db";
import { auth } from "../auth";
import { getUserByEmail,getUserById } from "./user";
import * as bcrypt from "bcrypt-ts";

export const updateUserPassword = async (
    currentPassword : string,
    newPassword : string,
) => {
  try {    
    const session = await auth();
    const authorId = session?.id;
    const user = await getUserById(parseInt(authorId));
    const IsSamePassword = await bcrypt.compare(currentPassword,user?.password)
    const hashPassword = await bcrypt.hash(newPassword,10)
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }
  
    if(!IsSamePassword){
      return { error: "Senha atual inválida" };
    }
    
    const updatedUser = await db.user.update({
      where: { id: user.id }, // Atualiza o usuário baseado no ID
      data: {
        password : hashPassword
      },
    });

    // console.log('Informações atualizadas:', updatedUser);

    return { success: "Senha alterada com sucesso!", error: null };

  } catch (error) {
    console.error('Erro ao atualizar as informações:', error);
    return { success: null, error: "Erro ao atualizar as informações." };
  }
};
