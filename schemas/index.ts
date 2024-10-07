import * as z from 'zod'

export const LoginSchema = z.object({
    email : z.string().email({
        message : "Email is Required"
    }),
    password : z.string().min(1,{
        message : "Password is required"
    })
})

export const RegisterSchema = z.object({
    email : z.string().email({
        message : "Email is Required"
    }),
    password : z.string().min(6,{
        message : "Minimum 6 characters required"
    }),
    name : z.string().min(1,{
        message : "Name is required"
    }),
    username : z.string().min(1,{
        message : "Username is required"
    })
})

export const ProfileSchema = z.object({
    location: z
    .string()
    // .min(4, { message: "Minimum 4 characters required" })
    .optional(),
    username: z
        .string()
        // .min(4, { message: "Minimum 4 characters required" })
        .optional(),
    bio: z
        .string()
        // .min(1, { message: "Bio is required" })
        .optional(),
    website: z
        .string()
        // .min(1, { message: "Website is required" })
        .optional(),
})