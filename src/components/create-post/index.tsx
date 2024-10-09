"use client"
import { useState } from "react";
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


type Post = {
  title: string
  description: string
}
const formSchema = z.object({
  title: z.string().optional(),
  description: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
const CreatePost = ({ posts, setPosts }: any) => {

  const [newPost, setNewPost] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description : "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const insertPost = await createpost(values);

      if (insertPost.success) {
        toast({
          title : "Post criado com sucesso!"
        })
        
        setPosts(insertPost.updatedPosts);
        setNewPost(""); 
      }
  }

  const submitNewPost = async () => {
    if (newPost.trim()) {
      const newPostObject: Post = {
        title: "", 
        description: newPost.trim()
      };

      const insertPost = await createpost(newPostObject);

      if (insertPost.success) {

        setPosts(insertPost.updatedPosts);
        setNewPost(""); 
      }
    }
  }

  const handleNewPost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPost(e.target.value);
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
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Title</FormLabel> */}
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <Button type="submit">Enviar</Button>
            </form>
          </Form>
        </CardContent>
        
      </Card>
    </div>
  );
}

export default CreatePost;
