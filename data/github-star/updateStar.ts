"use server";
import { db } from "@/lib/db";
import { auth } from "../../auth";
import { getUserById } from "../user";

export const UpdateStar = async (
) => {
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
    const val = existingStar.length > 0;

    if (val) {

      const deletedStar = await db.gitHubStar.delete({
        where: {
          id: existingStar[0].id
        },
      });

      return { deletedStar, message: "Star removido com sucesso", error: null };

    } else {
      const createdStar = await db.gitHubStar.create({
        data: {
          userId: user?.id,
        },
      });

      return { createdStar, message: "Star criada com sucesso", error: null };
    }
  } catch (error) {
    console.error('Erro ao atualizar as informações:', error);
    return { success: null, error: "Erro ao atualizar as informações." };
  }
};
