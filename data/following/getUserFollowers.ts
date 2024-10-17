"use server"
import { db } from "@/lib/db";
import { auth } from "../../auth";


export const getUserFollowers = async (

    userId: number

) => {
    try {
        const followers = await db.following.findMany({
            where: { followingId: userId },
            include: { follower: true } // Inclui os detalhes de quem está seguindo
        });
        return { followers: followers, success: "Informações atualizadas com sucesso!", error: null };
        // Retorna `true` se o relacionamento existir, `false` caso contrário
    } catch (error) {
        console.error('Erro ao atualizar as informações:', error);
        return { success: null, error: "Erro ao atualizar as informações." };
    }
};

// Função para Listar Quem o Usuário Está Seguindo
export const getUserFollowing = async (
) => {
    try {
        const session = await auth();
        const authorId = session?.id;

         const following = await db.following.findMany({
            where: { followerId: Number(authorId) }, // Aqui, você pode usar followerId se o `userId` for quem está seguindo.
            include: {
                following: true, // Inclui informações dos usuários seguidos
            },
        });
        return following.map(f => f.following);        
    } catch (error) {
        console.error('Erro ao atualizar as informações:', error);
        return { success: null, error: "Erro ao atualizar as informações." };
    }
};