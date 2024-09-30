"use client"

import * as  z from 'zod'
import { CardWrapper } from "./cardWrapper"
import { useForm } from "react-hook-form"

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
import { Register } from '@/action/register'
import { useState, useTransition } from 'react'
import { RegisterSchema } from '../../../schemas'
import { Loader2 } from 'lucide-react'
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';

export const RegisterForm = () => {
    
    const [isPending,startTransition] = useTransition()
    const [error,SetError] = useState<string | undefined>("")
    const [sucess,SetSucess] = useState<string | undefined>("")
    const [seePassword,SetseePassword] = useState<boolean>(false)

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver : zodResolver(RegisterSchema),
        defaultValues : {
            email : "",
            password : "",
            username : "",
            name : "",
        }
    })

    const OnSubmit = (values : z.infer<typeof RegisterSchema>) => {

        SetError("")
        SetSucess("")

       startTransition(()=>{
            Register(values)
            .then((data) => {
                SetError(data.error);
                SetSucess(data.sucess)
            })
       })

    }
    return (
        <CardWrapper
            headerLabel="Crie sua conta!"
            backButtonLabel="Já possui uma conta?"
            backButtonHref="/auth/login"
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
                            name='name'
                            render={({field}) => (
                                <FormItem>
                                      <FormLabel>Nome</FormLabel>
                                      <FormControl>
                                        <Input {...field} placeholder='Seu nome' type='name'/>
                                      </FormControl>
                                      <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='email'
                            render={({field}) => (
                                <FormItem>
                                      <FormLabel>Email</FormLabel>
                                      <FormControl>
                                        <Input {...field} placeholder='exemplo@exemplo.com' type='email'/>
                                      </FormControl>
                                      <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='username'
                            render={({field}) => (
                                <FormItem>
                                      <FormLabel>Username</FormLabel>
                                      <FormControl>
                                        <Input {...field} placeholder='username' type='text'/>
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
                                    <FormLabel>Senha</FormLabel>
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
                    >{isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Registrar'}</Button>
                </form>
           </Form>

        </CardWrapper>
    )
}