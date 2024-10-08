"use server"
import * as z from 'zod'

import { db } from '@/lib/db';
import * as bcrypt from "bcrypt-ts";
import { RegisterSchema } from '../../schemas';
import { getUserByEmail, getUserByUsername } from '../../data/user';

export const Register = async (values : z.infer<typeof RegisterSchema> ) => {

    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success) {
        return {
            error : "Invalid Fields"
        };
    }
    const {email, password, name,username} = validatedFields.data

    const hashPassword = await bcrypt.hash(password,10)
    

    const existingUser = await getUserByEmail(email);

    const existingUsername = await getUserByUsername(username);

    if(existingUser) {
        return {
            error : "Email already in use!"
        };
    }

    if(existingUsername) {
        return {
            error : "This username already in use!"
        };
    }
    await db.user.create({
        data : {
            name, 
            email,
            username,
            password : hashPassword,
        }
    })
    // mandar mensagem de verificacao

    return { sucess : "User Created!"};
}