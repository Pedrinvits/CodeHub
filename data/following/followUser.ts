"use server"
import { db } from "@/lib/db";
import { auth } from "../../auth";


export const followUser = async (
  followingId: number
) => {
  try {
    const session = await auth()
    const userId = session?.id

    const existingFollowing = await db.following.findFirst({
      where: {
        followerId: Number(userId),
        followingId
      }
    });

    if (existingFollowing) {
      throw new Error("Você já está seguindo esse usuário.");
    }

    // Cria a relação de "seguir"
    await db.following.create({
      data: {
        followerId: Number(userId),
        followingId
      }
    });

    return { success: "Informações atualizadas com sucesso!", error: null };
  } catch (error) {
    console.error('Erro ao atualizar as informações:', error);
    return { success: null, error: "Erro ao atualizar as informações." };
  }
};


export const unfollowUser = async (

  followingId: number

) => {
  try {

    const session = await auth()
    const userId = session?.id

    const existingFollowing = await db.following.findFirst({
      where: {
        followerId: Number(userId),
        followingId
      }
    });

    if (!existingFollowing) {
      throw new Error("Você não está seguindo esse usuário.");
    }

    await db.following.delete({
        where: { id: existingFollowing.id }
    });
    
    return { success: "Informações atualizadas com sucesso!", error: null };
  } catch (error) {
    console.error('Erro ao atualizar as informações:', error);
    return { success: null, error: "Erro ao atualizar as informações." };
  }
};