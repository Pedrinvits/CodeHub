"use client"
import { useState } from "react";
import { deleteUser } from "../../../data/deleteUser";
import { toast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const DeleteAccount = ({name} : any) => {
    const [deleteWord, setDeleteWord] = useState('');
    const handleDeleteAccount = async () => {
        try {
         if(deleteWord !== name){
            console.log('Digite seu nome corretamente');
            
         }else{
            const result = await deleteUser()
             if(result.success){
              toast({
                title: "Conta excluída com sucesso!",
              })
              redirect('/auth/register')
             }
         }
        }
        catch(err){
          console.log(err);
        }
      }
    return (
        <div id="delete" className="space-y-6">
            {/* <div className="space-y-2">
                <h3 className="text-lg font-semibold text-red-500">Deletar Conta</h3>
                <p className="text-muted-foreground">Sua conta será permanentemente deletada e você perderá todos seus dados</p>
                <p className="text-muted-foreground">Digite "{name}" para confirmar a exclusão da conta</p>
            </div> */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col items-start gap-4 mt-4">
                    <Input
                        id="deleteconfirmation"
                        placeholder={`Tap "${name}" for delete your account`}
                        onChange={(e) => setDeleteWord(e.target.value)}
                    />
                </div>
                <Button variant="destructive" className="w-full" onClick={handleDeleteAccount}>
                    Deletar Conta
                </Button>
            </div>
        </div>
    );
}

export default DeleteAccount;