"use server"
import { db } from "@/lib/db";
import { auth } from "../auth";
import { getUserByEmail } from "./user";
type Post = {
  title: string
  description: string
}
export const findposts = async (

  post: Post

) => {
  try {
    // // Autenticação para obter a sessão e o ID do usuário
    const posts = await db.post.findMany();

    return { posts, error: null };

  } catch (error) {
    return { success: null, error: "Erro ao atualizar as informações." };
  }
};
