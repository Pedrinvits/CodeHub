"use server"
import { db } from "@/lib/db";


export const followUser = async (
  followerId: number, 
  followingId: number
) => {
  try {
    const existingFollowing = await db.following.findFirst({
      where: {
        followerId,
        followingId
      }
    });
    
    if (existingFollowing) {
      throw new Error("Você já está seguindo esse usuário.");
    }

    // Cria a relação de "seguir"
    await db.following.create({
      data: {
        followerId,  // ID do usuário que está seguindo
        followingId   // ID do usuário que está sendo seguido
      }
    });

    return { success: "Informações atualizadas com sucesso!", error: null };
  } catch (error) {
    console.error('Erro ao atualizar as informações:', error);
    return { success: null, error: "Erro ao atualizar as informações." };
  }
};


export const unfollowUser  = async (

    followerId: number, followingId: number

) => {
  try {

    const existingFollowing = await db.following.findFirst({
        where: {
          followerId,
          followingId
        }
      });

    if (!existingFollowing) {
        throw new Error("Você não está seguindo esse usuário.");
    }

    // Remove a relação de "seguir"
    await db.following.delete({
        where: { id: existingFollowing.id }
    });
    
    return { success: "Informações atualizadas com sucesso!", error: null };
  } catch (error) {
    console.error('Erro ao atualizar as informações:', error);
    return { success: null, error: "Erro ao atualizar as informações." };
  }
};