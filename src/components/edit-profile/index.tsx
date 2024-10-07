"use client"
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import * as  z from 'zod'
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
import { EditProfileForm } from '@/action/editProfile'
import { useTransition } from 'react'
import { ProfileSchema } from '../../../schemas'
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";

const EditProfile = ({ userProfile }: any) => {

    const [profileInfos, SetprofileInfos] = useState(userProfile)
    const [isOpen, setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const [error, SetError] = useState<string | undefined>("")
    const [sucess, SetSucess] = useState<string | undefined>("")

    const form = useForm<z.infer<typeof ProfileSchema>>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            username: "",
            bio: "",
            location: "",
            website: ""
        }
    })

    const OnSubmit = (values: z.infer<typeof ProfileSchema>) => {

        SetError("")
        SetSucess("")

        startTransition(() => {
            EditProfileForm(values)
                .then((data) => {
                    SetprofileInfos(values)
                    SetError(data?.error);
                    SetSucess(data?.sucess)
                    toast({
                        title: "Informações alteradas com sucesso!",
                    })
                })
            SetError("")
            SetSucess("")
        })

    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(OnSubmit)}
                        className='space-y-6'
                    >
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name='username'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder={profileInfos.username} type='text' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='bio'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bio</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder={profileInfos.bio} type='text' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='location'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder={profileInfos.location} type='text' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='website'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Website</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder={profileInfos.website} type='text' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button
                            type='submit'
                            className='w-full'
                            disabled={isPending}
                        >{isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Enviar'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default EditProfile;