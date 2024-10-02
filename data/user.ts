import { db } from "@/lib/db";
import { User, Post, Coment } from '@prisma/client';

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

export const getUsers = async () => {
  try {
      
      const recentsUsers = await db.user.findMany({
        take : 3,
        orderBy: {
          id: 'asc',
        }
      })

      return recentsUsers;

  }catch(error){
      return null
  }
}