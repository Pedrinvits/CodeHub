"use server"
import { db } from "@/lib/db";
import { User, Post, Coment } from '@prisma/client';
import { auth } from "../auth";

export type UserWithPostsAndComments = User & {
  posts: (Post & {
    coments: Coment[];
  })[];
};

export const getUserByEmail = async (email : string) => {
    try {

        const user = db.user.findUnique({
            where : {
                email
            }
        })

        return user;

    }catch(error){
        return null
    }
}


export const getUserById = async (id : number) : Promise<UserWithPostsAndComments | null> => {
    try {
        
        const user: UserWithPostsAndComments | null = await db.user.findUnique({
            where: {
              id,
            },
            include: {
              posts: {
                include: {
                  coments: true, // Inclui os comentários dos posts
                },
              },
              _count : {
                select : {
                  following : true,
                  followers : true,
                  posts : true,
                }
              }
            },
          });

        return user;

    }catch(error){
        return null
    }
}

export const getUserByUsername = async (username : string) : Promise<UserWithPostsAndComments | null> => {
  try {
      
      const user: UserWithPostsAndComments | null = await db.user.findUnique({
          where: {
            username
          },
          include: {
            posts: {
              include: {
                coments: true, 
              },
            },
            followers : true,
            following : true,
            _count : {
              select : {
                following : true,
                followers : true,
                posts : true,
              }
            }
          },
        });

      return user;

  }catch(error){
      return null
  }
}

export const getUsers = async (limit ?: number) => {

  const session = await auth();
  const authorId = session?.id;

  const user = await getUserById(parseInt(authorId));

  if (!user) {
    throw new Error('Usuário não encontrado.');
  }
  const userId = user.id

  try {
      
      const recentsUsers = await db.user.findMany({
        where: {
          id: {
            not: userId,
          },
        },
        include : {
          followers : true,
          following : true,
        },
        take: limit ? limit : undefined,
        orderBy: {
          id: 'asc',
        },
      });

      return recentsUsers;

  }catch(error){
      return null
  }
}

export const getUsersNotFollowing = async (userId: number) => {

  try {
    // Busca todos os usuários que o usuário atual está seguindo
    const followedUsers = await db.following.findMany({
        where: {
            followerId: Number(userId)
        },
        select: {
            followingId: true // Pegamos o ID dos usuários seguidos
        }
    })

    // Coletando os IDs dos usuários seguidos
    const followedUserIds = followedUsers.map(follow => follow.followingId)

    // Busca todos os usuários que não estão na lista de seguidos
    const usersNotFollowing = await db.user.findMany({
        where: {
          id: {
            not: Number(userId), 
          },
            NOT: {
                id: {
                    in: followedUserIds
                }
            }
        }
    })

    return usersNotFollowing
} catch (error) {
    console.error('Erro ao buscar usuários não seguidos:', error)
    throw new Error('Erro ao buscar usuários não seguidos')
}

}
