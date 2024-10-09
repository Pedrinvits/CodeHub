"use client";
import { Loader2, Pen } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ChangeEvent, FormEvent, useState } from "react";
import { useImageUpload } from "@/hooks/useImageUpload";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { updateUserCover } from "../../../data/updateUserCover";
import { toast } from "@/hooks/use-toast";

const ChangeCoverPhoto = () => {
    const [newPhoto, setNewPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>('');
    const { imgURL, progressPorcent, uploadImage } = useImageUpload();
    const [loading,SetLoading] = useState(false)

    const handlePhotoSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        SetLoading(true)

        const fileInput = event.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
        const file = fileInput?.files?.[0] || null;
    
        if (file) {
            uploadImage(file, async (imgURL) => {
               const res = await updateUserCover(imgURL)
               if(res.success){
                SetLoading(false)
                toast({
                    title : 'Foto de fundo alterada com sucesso!'
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
        <Dialog>
            <DialogTrigger><Pen color="white" size={15} /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change your cover photo</DialogTitle>
                    <form onSubmit={handlePhotoSubmit}>
                        <div className="flex items-start gap-4 flex-col mt-4">
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                id="photo-upload"
                            />
                            <Button type="submit" disabled={!newPhoto}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Salvar foto'}
                          </Button>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ChangeCoverPhoto;
