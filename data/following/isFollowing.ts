"use server"
import { db } from "@/lib/db";


export const isFollowing = async (

    followerId: number, followingId: number

) => {
    try {
        const following = await db.following.findFirst({
            where: {
                followerId,
                followingId
            }
        });
        return { following : !!following,success: "Informações atualizadas com sucesso!", error: null };
        // Retorna `true` se o relacionamento existir, `false` caso contrário
    } catch (error) {
        console.error('Erro ao atualizar as informações:', error);
        return { success: null, error: "Erro ao atualizar as informações." };
    }
};