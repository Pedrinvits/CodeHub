"use client"

import * as  z from 'zod'
import { CardWrapper } from "./cardWrapper"
import { useForm } from "react-hook-form"
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';

import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSucess } from '../form-sucess'
import { Login } from '@/action/login'
import { useState, useTransition } from 'react'
import { LoginSchema } from '../../../schemas'
import { Loader2 } from "lucide-react";

export const LoginForm = () => {
    
    const [isPending,startTransition] = useTransition()
    const [error,SetError] = useState<string | undefined>("")
    const [sucess,SetSucess] = useState<string | undefined>("")
    const [seePassword,SetseePassword] = useState<boolean>(false)

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver : zodResolver(LoginSchema),
        defaultValues : {
            email : "",
            password : "",
        }
    })

    const OnSubmit = (values : z.infer<typeof LoginSchema>) => {

        SetError("")
        SetSucess("")

       startTransition(()=>{
            Login(values)
            .then((data) => {
                SetError(data?.error);
                SetSucess(data?.sucess)
            })
       })

    }
    return (
        <CardWrapper
            headerLabel="Welcome back!"
            backButtonLabel="Don't have an account? Sign up"
            backButtonHref="/auth/register"
            showSocial
        >
           <Form {...form}>
                <form 
                 onSubmit={form.handleSubmit(OnSubmit)}
                 className='space-y-6'
                 >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name='email'
                            render={({field}) => (
                                <FormItem>
                                      <FormLabel>Email</FormLabel>
                                      <FormControl>
                                        <Input {...field} placeholder='example@example.com' type='email'/>
                                      </FormControl>
                                      <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                        control={form.control}
                        name='password'
                        render={({field}) => (
                            <FormItem>
                                    <FormLabel>Password</FormLabel>
                                        <div className='flex relative'>
                                            <FormControl>
                                            <Input {...field} placeholder='********' type={seePassword ? 'text' : 'password'}/>
                                            </FormControl>
                                            <FormControl>
                                            <Button className="absolute bottom-1 right-1 h-7 w-7" size="icon" variant="ghost" type="button" onClick={()=>SetseePassword(!seePassword)}>
                                                {seePassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                            </Button>
                                            </FormControl>
                                            </div>
                                    <FormMessage/>
                            </FormItem>
                        )}
                        />
                    </div>   
                    <FormError message={error}/>
                    <FormSucess message={sucess}/>
                    <Button 
                    type='submit'
                    className='w-full'
                    disabled={isPending}
                    >{isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Login'}</Button>
                </form>
           </Form>

        </CardWrapper>
    )
}