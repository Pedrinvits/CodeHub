"use server"
import { db } from "@/lib/db";
import { auth } from "../../auth";
import { getUserByEmail } from "../user";

export const GetsavedPosts = async () => {
  try {
    // Obter a sessão do usuário atual
    const session = await auth();
    const authorId = session?.user?.email;

    // Buscar o usuário pelo e-mail
    const user = await getUserByEmail(authorId as any);

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    // Buscar os posts salvos pelo usuário
    const savedPosts = await db.savedPost.findMany({
      where: {
        userId: user.id,
      },
      include: {
        post: {
          include: {
            postLikes: {
              include: {
                user: {
                  select: {
                    username: true,
                    profileImageUrl: true,
                    savedPosts: true,
                  },
                },
              },
            },
            savedByUsers: {
              include: {
                user: {
                  select: {
                    id: true,
                  },
                },
              },
            },
            author: {
              select: {
                id: true,
                username: true,
                profileImageUrl: true,
              },
            },
            coments: {
              include: {
                user: {
                  select: {
                    username: true,
                    profileImageUrl: true,
                    savedPosts: true,
                  },
                },
              },
            },
            _count: {
              select: {
                coments: true,      // Contagem de comentários
                postLikes: true,    // Contagem de likes
              },
            },
          },
        },
      },
      distinct: ['postId'], // Aplica DISTINCT com base no postId
    });

    // Modificar os dados para que a estrutura fique mais parecida com o retorno de findPosts
    const formattedPosts = savedPosts.map((savedPost) => {
      const post = savedPost.post;

      return {
        id: post.id,
        title: post.title,
        description: post.description,
        imageUrl: post.imageUrl || '',
        created_at: post.created_at,
        updated_at: post.updated_at,
        author: post.author,  // Autor do post
        postLikes: post.postLikes,
        savedByUsers: post.savedByUsers,
        coments: post.coments,
        _count: post._count,  // Contagem de comentários e likes
        likes: post._count.postLikes,
        commentsCount: post._count.coments,
      };
    });

    return { savedPosts: formattedPosts, error: null };
  } catch (error) {
    return { success: null, error: "Erro ao atualizar as informações." };
  }
};
