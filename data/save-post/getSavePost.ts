"use server"
import { db } from "@/lib/db";
import { auth } from "../../auth";
import { getUserByEmail } from "../user";


export const GetsavedPosts = async (
) => {
  try {
    
    const session = await auth();
    const authorId = session?.user?.email;

    const user = await getUserByEmail(authorId as any);

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

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
                coments: true,
                postLikes: true,
              },
            },
          },
        },
      },
      distinct: ['postId'], // Aplica DISTINCT com base no postId
    });
    
    return { savedPosts, error: null };
  } catch (error) {
    return { success: null, error: "Erro ao atualizar as informações." };
  }
};
