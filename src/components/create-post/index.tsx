"use client"
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { createpost } from "../../../data/createPost";

type Post = {
    title : string
    description: string
  }
  
const CreatePost = () => {
    const samplePosts: Post[] = [
        {
          id: 1,
          user: "Alice Johnson",
          content: "Just finished a great book! Any recommendations for my next read?",
          timestamp: "2 hours ago",
          likes: 24,
          comments: [
            { id: 1, user: "Bob Smith", content: "Try 'The Midnight Library'!", timestamp: "1 hour ago" },
            { id: 2, user: "Carol Davis", content: "I loved 'Project Hail Mary'", timestamp: "30 minutes ago" },
          ],
        },
        {
          id: 2,
          user: "David Wilson",
          content: "Beautiful sunset at the beach today!",
          timestamp: "4 hours ago",
          likes: 56,
          comments: [
            { id: 3, user: "Eva Brown", content: "Wow, looks amazing!", timestamp: "3 hours ago" },
          ],
        },
        {
          id: 3,
          user: "Frank Lee",
          content: "Just launched my new website! Check it out and let me know what you think.",
          timestamp: "6 hours ago",
          likes: 89,
          comments: [],
        },
      ]

const [newPost, setNewPost] = useState<string>("")
const [posts, setPosts] = useState<Post[]>(samplePosts)

  const submitNewPost = async () => {
  
    if (newPost.trim()) {
      const newPostObject: Post = {
        title : "",
        description: newPost.trim()
      }
     
      const insertPost = await createpost(newPostObject)
     
      if (insertPost.success){
        // TODO : insert Sucess Toast here
        setPosts(prevPosts => [newPostObject, ...prevPosts])
        setNewPost("")
      }
    }
  }
  const handleNewPost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPost(e.target.value)
  }
    return ( 
        <Card className="w-full max-w-2xl mx-auto mb-6">
          <CardHeader>
            <h2 className="text-lg font-semibold">Create a new post</h2>
          </CardHeader>
          <CardContent>
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
     );
}
 
export default CreatePost;