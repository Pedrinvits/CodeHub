"use client"
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { createpost } from "../../../data/createPost";
import { Input } from "../ui/input";
import Posts from "../posts";

type Post = {
    title : string
    description: string
  }
  
const CreatePost = ({Recentposts} : any) => {
    
const [newPost, setNewPost] = useState<string>("")
const [posts, setPosts] = useState<Post[]>(Recentposts)

  const submitNewPost = async () => {
  
    if (newPost.trim()) {
      const newPostObject: Post = {
        title : "",
        description: newPost.trim()
      }
     
      const insertPost = await createpost(newPostObject)
     
      if (insertPost.success){
        // TODO : insert Sucess Toast here
        setPosts((prevPosts) => [...prevPosts, newPostObject]);
        setNewPost(""); 
      }
    }
  }
  const handleNewPost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPost(e.target.value)
  }

    return ( 
        <div className="flex flex-col">
          <Card className="w-full max-w-2xl mx-auto mb-6">
          <CardHeader>
            <h2 className="text-lg font-semibold">Create a new post</h2>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Textarea
              placeholder="What's on your mind?"
              value={newPost}
              onChange={handleNewPost}
              rows={3}
              className="w-full"
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            {/* TODO : add loading in this button */}
            <Button onClick={submitNewPost}>Post</Button>
          </CardFooter>
        </Card>
        <Posts prop={posts}/>
        </div>
     );
}
 
export default CreatePost;