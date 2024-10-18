"use server";
import { db } from "@/lib/db";
import { auth } from "../../auth";
import { getUserById } from "../user";

export const getAllStars = async () => {
  try {
    const session = await auth();
    const authorId = session?.id;
    const user = await getUserById(parseInt(authorId));

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }
    const existingStar = await db.gitHubStar.findMany({
      where: {
        userId: user.id,
      },
    });
    const isUserStar = existingStar.length > 0;

    const totalStars = await db.gitHubStar.count()
 
    return {isUserStar, totalStars, error: null };
  } catch (error) {
    console.error('Erro ao atualizar as informações:', error);
    return { success: null, error: "Erro ao atualizar as informações." };
  }
}
