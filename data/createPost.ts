"use server"
import { db } from "@/lib/db";
import { auth } from "../auth";
import { getUserByEmail } from "./user";
type Post = {
  title: string
  description: string
  imgURL: string
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
    
    await db.post.create({
      data: {
        authorId: user.id,
        title : post.title,
        description : post.description,
        imageUrl : post.imgURL
      },
    });
    // console.log(res);
    const updatedPosts = await db.post.findMany({
      include : {
        author : {
          select : {
            username : true,
            profileImageUrl : true,
          }
        }
      }
    })

    return { updatedPosts, success: "Post criado com sucesso!", error: null };
  } catch (error) {
    console.error('Erro ao atualizar as informações:', error);
    return { success: null, error: "Erro ao atualizar as informações." };
  }
};
