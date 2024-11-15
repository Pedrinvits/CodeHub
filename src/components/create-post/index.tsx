"use client"
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { createpost } from "../../../data/createPost";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "@/hooks/use-toast";
import { useImageUpload } from "@/hooks/useImageUpload";
import Image from "next/image";
import { ImagePlus, Loader2, X } from "lucide-react";
import { Label } from "../ui/label";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
 'image/jpeg',
 'image/jpg',
 'image/png',
 'image/webp',
]

type Post = {
  title: string
  description: string
}

const formSchema = z.object({
  title: z.string().optional(),
  description: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  // image: z
  // .any()
  // .refine((files) => files?.length >= 1, { message: 'Image is required.' })
  // .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
  //   message: '.jpg, .jpeg, .png and .webp files are accepted.',
  //  })
  // .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
  //   message: `Max file size is 5MB.`,
  //  }),
})



const CreatePost = ({ posts, setPosts,onClose }: any) => {
  const [newPhoto, setNewPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>("");
  const [loading,SetLoading] = useState(false)
  const { imgURL, progressPorcent, uploadImage } = useImageUpload();

  const handleRemoveImage = () => {
    setNewPhoto(null)
    setPhotoPreview(null)
  }
  const [newPost, setNewPost] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description : "",
      // image : ""
    },
  })
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    SetLoading(true)
    const fileInput = event.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
    const file = fileInput?.files?.[0] || null;

    if (file) {
        uploadImage(file, async (imgURL) => {
          const createPostValues = {
            title : values.title,
            description : values.description,
            imgURL,
          }
          const insertPost = await createpost(createPostValues);
          SetLoading(false)
          if (insertPost.success) {
            toast({
              title : "Post criado com sucesso!"
            })
            
            setPosts(insertPost.updatedPosts);
            setNewPost(""); 
            onClose();
          }
        });
    }else{

      const createPostValues = {
        title : values.title,
        description : values.description,
        imgURL : '',
      }
      const insertPost = await createpost(createPostValues);
      SetLoading(false)
      if (insertPost.success) {
        toast({
          title : "Post criado com sucesso!"
        })
        
        setPosts(insertPost.updatedPosts);
        setNewPost(""); 
        onClose();
      }
    } 
  }

  return ( 
    <div className="flex flex-col">
      <Card className="w-full mx-auto mb-6 shadow-lg">
        <CardHeader>
          <h2 className="text-lg font-semibold">Create a new post</h2>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Description</FormLabel> */}
                      <Textarea
                        placeholder="What's on your mind?"
                        rows={3}
                        className="w-full"
                        {...field}
                      />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    {photoPreview && (
                      <div className="mb-4 relative">
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="relative top-[40px] right-0 bg-gray-800 bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75 transition-opacity m-2"
                        >
                          <X size={16} />
                        </button>
                        <Image src={photoPreview} alt="Preview" width={300} height={200} className="rounded-md"/>
                      </div>                    
                    )}
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                        id="photo-upload"
                      />
                      <Label htmlFor="photo-upload" className="cursor-pointer px-4 py-2 rounded-md flex items-center border w-fit">
                      <ImagePlus size={14} className="mr-2" />
                      Upload Photo
                      </Label>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Send'}
              </Button>
            </form>
          </Form>
        </CardContent>
        
      </Card>
    </div>
  );
}

export default CreatePost;
