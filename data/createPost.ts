"use server"
import { db } from "@/lib/db";
import { auth } from "../auth";
import { getUserByEmail } from "./user";
type Post = {
  title: string
  description: string
}
export const createpost = async (

  post: Post

) => {
  try {
    // Autenticação para obter a sessão e o ID do usuário
    const session = await auth();
    const authorId = session?.user?.email;

    // Obtenção do usuário pelo e-mail
    const user = await getUserByEmail(authorId as any);

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const createPost = await db.post.create({
      data: {
        authorId: user.id,
        title: post.title,
        description: post.description
      },
    });

    // cria o post e depois manda os posts atualizados
    const updatedPosts = await db.post.findMany()

    return { updatedPosts, success: "Informações atualizadas com sucesso!", error: null };
  } catch (error) {
    console.error('Erro ao atualizar as informações:', error);
    return { success: null, error: "Erro ao atualizar as informações." };
  }
};
