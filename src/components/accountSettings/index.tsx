"use client"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Eye, EyeOff, Loader2, SettingsIcon, Upload } from "lucide-react"
import { ChangeEvent, useState } from "react"
import { getUserByEmail } from "../../../data/user"
import { useSession } from "next-auth/react";
import { updateUserName } from "../../../data/updateUserName"
import { updateUserEmail } from "../../../data/updateUserEmail"
import { deleteUser } from "../../../data/deleteUser"
import { redirect } from 'next/navigation'
import { updateUserPassword } from "../../../data/updateUserPassword"
import { toast, useToast } from "@/hooks/use-toast"
import { useImageUpload } from "@/hooks/useImageUpload";
import { FormEvent } from "react";
import { updateUserPhoto } from "../../../data/updateUserPhoto"

interface StatePassword  {
  currentpassword : string;
  newpassword : string;
  confirmpassword : string;
}

export default function AccountSettings({name,email,photo_user_profile} : any) {
  const { toast } = useToast()
  const [selectedOption, setSelectedOption] = useState("profile")
  const [seePassword,SetseePassword] = useState<boolean>(false)
  const [userData, setUserData] = useState({ name, email });
  const [passwordData, setpasswordData] = useState<StatePassword>({ 
    currentpassword : '', newpassword : '', confirmpassword : '' 
  });
  const [deleteWord, setDeleteWord] = useState('');
  const [newPhoto, setNewPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(photo_user_profile);
  const { imgURL, progressPorcent, uploadImage } = useImageUpload();
  const [loading,SetLoading] = useState(false)

  const handleProfileUpdate = async () => {
    SetLoading(true)
    try {

      if(userData.name !== name){
        if (userData.name == name) {
          return
        }
        else{
         const result =  await updateUserName(userData.name)
         if(result.success){
          toast({
            title: "Nome alterado com sucesso!",
            })
         }
        }
      }

     if(userData.email !== email){
      if (userData.email == email) {
        return
      }else{
        const result = await updateUserEmail(userData.email)
        if(result.success){
          toast({
            title: "Email alterado com sucesso!",
            })
         }
      }
     }
      
    }
    catch(err){
      console.log(err);
    }
    finally {
      SetLoading(false)
    }
  }
  const handlePasswordUpdate = async () => {
    SetLoading(true)
    try {
          if(passwordData.newpassword !== passwordData.confirmpassword){
            console.log('Senhas digitadas sao incorretas');
          }
          const result = await updateUserPassword(passwordData.currentpassword, passwordData?.newpassword)
         if(result.success){
          toast({
            title: "Senha alterada com sucesso!",
          })
         }
    }
    catch(err){
      console.log(err);
    }
    finally{
      SetLoading(false)
    }
  }
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
  const handlePhotoSubmit = async (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    SetLoading(true);
    // Acessa o campo input[type="file"] corretamente
    const fileInput = event.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
    const file = fileInput?.files?.[0] || null;

    if (file) {
      uploadImage(file, async (imgURL) => {
         const res =await updateUserPhoto(imgURL)
         
         if(res.success){
            SetLoading(false)
            toast({
              title: "Foto de perfil alterada com sucesso!",
            })
         }
         
      });
  }
    
};
const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    setNewPhoto(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
};
  return (
    <>
      <Dialog>
      <DialogTrigger asChild className="w-full gap-2">
        <Button variant="outline"><SettingsIcon className="h-5 w-5" />Configurações</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-w-[22rem] rounded-lg">
        <DialogHeader>
          <DialogTitle>Configurações</DialogTitle>
        </DialogHeader>
        <div className="sm:grid sm:grid-cols-[200px_1fr] sm:gap-6 sm:p-6 ">
          <div className="space-y-2 border-r pr-6 ">
            <Button
              variant={selectedOption === "profile" ? "secondary" : "ghost"}
              onClick={() => setSelectedOption("profile")}
              className="w-full justify-start"
            >
              Perfil
            </Button>
            <Button
              variant={selectedOption === "password" ? "secondary" : "ghost"}
              onClick={() => setSelectedOption("password")}
              className="w-full justify-start"
            >
              Senha
            </Button>
            <Button
              variant={selectedOption === "photo" ? "secondary" : "ghost"}
              onClick={() => setSelectedOption("photo")}
              className="w-full justify-start"
            >
              Photo
            </Button>
            <Button
              variant={selectedOption === "delete" ? "secondary" : "ghost"}
              onClick={() => setSelectedOption("delete")}
              className="w-full justify-start"
            >
              Deletar
            </Button>
          </div>
          <div className="space-y-4 mt-4">
            {selectedOption === "profile" && (
                  <div id="profile" className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Perfil</h3>
                    <p className="text-muted-foreground">Troque seu nome ou outra informação da conta</p>
                  </div>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                      <Label htmlFor="name">Nome</Label>
                      <Input 
                        id="name" 
                        defaultValue={name} 
                        onChange={(e) => setUserData({...userData, name:e.target.value})}
                        />
                    </div>
                    <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        defaultValue={email} 
                        onChange={(e) => setUserData({...userData, email:e.target.value})}
                      />
                    </div>
                      <Button className="w-full" onClick={handleProfileUpdate}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Salvar'}
                      </Button>
                    </div>
                  </div>
                )}
                {selectedOption === "password" && (
                  <div id="password" className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Senha</h3>
                      <p className="text-muted-foreground">Troque a senha da sua conta</p>
                    </div>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                        <Label htmlFor="current-password">Senha Atual</Label>
                        <Input 
                          id="currentpassword" 
                          type={seePassword ? 'text' : 'password'} 
                          placeholder="Coloque sua senha atual" 
                          onChange={(e) => setpasswordData({...passwordData, currentpassword:e.target.value})}
                          />
                        <Button className="absolute bottom-1 right-1 h-7 w-7" size="icon" variant="ghost" type="button" onClick={()=>SetseePassword(!seePassword)}>
                            {seePassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </Button>
                      </div>
                      <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                        <Label htmlFor="new-password">Nova Senha</Label>
                        <Input 
                          id="newpassword" 
                          type={seePassword ? 'text' : 'password'} 
                          placeholder="Coloque sua nova senha" 
                          onChange={(e) => setpasswordData({...passwordData, newpassword:e.target.value})}
                          />
                      </div>
                      <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                        <Label htmlFor="confirm-password">Confirme a nova senha</Label>
                        <Input 
                          id="confirmpassword" 
                          type={seePassword ? 'text' : 'password'} 
                          placeholder="Confirme sua nova senha" 
                          onChange={(e) => setpasswordData({...passwordData, confirmpassword:e.target.value})}
                          />
                      </div>
                      <Button className="w-full" onClick={handlePasswordUpdate}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Trocar Senha'}
                      </Button>
                    </div>
                  </div>
                )}
                {selectedOption === "photo" && (
                <div id="photo" className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Foto do Perfil</h3>
                    <p className="text-muted-foreground">Atualize sua foto de perfil</p>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={photoPreview} alt={name} />
                      <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <form onSubmit={handlePhotoSubmit}>
                      <div className="flex items-center gap-4">
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            // className="hidden"
                            id="photo-upload"
                          />
                          {/* <Label htmlFor="photo-upload" className="cursor-pointer">
                            <Button variant="outline" className="gap-2">
                              <Upload className="h-4 w-4" />
                              Escolher foto
                            </Button>
                          </Label> */}
                          <Button type="submit" disabled={!newPhoto}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Salvar foto'}
                          </Button>
                          </div>
                    </form>
                  </div>
                </div>
              )}
                {selectedOption === "delete" && (
                  <div id="delete" className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-red-500">Deletar Conta</h3>
                      <p className="text-muted-foreground">Sua conta será permanentemente deletada e você perderá todos seus dados</p>
                      <p className="text-muted-foreground">Digite "{name}" para confirmar a exclusão da conta</p>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col items-start gap-4">
                        <Input 
                          id="deleteconfirmation" 
                          placeholder={`Digite "${name}" para confirmar`}
                          onChange={(e) => setDeleteWord(e.target.value)}
                          />
                      </div>
                      <Button variant="destructive" className="w-full" onClick={handleDeleteAccount}>
                        Deletar Conta
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
        </div>
      </DialogContent>
      </Dialog>
    </>
  )
}
