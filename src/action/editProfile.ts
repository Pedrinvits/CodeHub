"use server"
import * as z from 'zod'


// import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { auth, signIn } from '../../auth';
import { ProfileSchema } from '../../schemas';
import { db } from '@/lib/db';
import { getUserById } from '../../data/user';

export const EditProfileForm = async (values : z.infer<typeof ProfileSchema> ) => {

    const session = await auth();
    const authorId = session?.id;

    // Obtenção do usuário pelo e-mail
    const user = await getUserById(parseInt(authorId));

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }
    
    const validatedFields = ProfileSchema.safeParse(values);

    if(!validatedFields.success) {
        return {
            error : "Campos inválidos"
        };
    }

    const {location,username,bio,website} = validatedFields.data;

    try {
       
        const updateUserInfos = await db.user.update({
            where : {
                id : user.id
            },data : {
                bio : bio,
                username : username,
                location : location,
                website : website
            }
        })
        
        return { sucess : "Sucess!", error : null};
        
    }catch(error){
        throw error;
    }
}