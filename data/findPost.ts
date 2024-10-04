"use server"
import { db } from "@/lib/db";
import { auth } from "../auth";
import { getUserById } from "./user";

export const findposts = async () => {
  try {
    const posts = await db.post.findMany({
      include: {
        postLikes: { // Inclui todos os likes
          include: {
            user: { // Inclui o usuário que deu o like
              select: {
                username: true, // Seleciona o nome do usuário que deu like
              }
            }
          }
        }, 
        author: { // Inclui o autor do post
          select: {
            username: true,
          }
        },
        _count: {
          select: {
            coments: true, 
            postLikes: true, // Conta a quantidade de likes
          }
        }
      }
    });     

    return { posts, error: null };

  } catch (error) {
    return { success: null, error: "Erro ao atualizar as informações." };
  }
};

export const findpost = async (
  post_id : number
) => {
  try {
   
    const post = await db.post.findUnique({
      where: {
        id: post_id, // Ou pode ser baseado no slug, dependendo da estrutura do seu schema
      },
      include: {
        postLikes: {
          include: {
            user: { // Inclui o usuário que deu like
              select: {
                username: true,
              },
            },
          },
        },
        author: { // Inclui o autor do post
          select: {
            username: true,
          },
        },
        _count: {
          select: {
            coments: true,
            postLikes: true, // Conta a quantidade de likes
          },
        },
      },
    });
    const postconvertedToArray = post ? [post] : [];    

    return { postconvertedToArray, error: null };

  } catch (error) {
    return { success: null, error: "Erro ao atualizar as informações." };
  }
};