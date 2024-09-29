import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Textarea } from "../ui/textarea";

type Post = {
    id: number
    user: string
    content: string
    timestamp: string
    likes: number
    comments: Comment[]
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

  const submitNewPost = () => {
    console.log('asdas = ');
    if (newPost.trim()) {
      const newPostObject: Post = {
        id: posts.length + 1,
        user: "Current User",
        content: newPost.trim(),
        timestamp: "Just now",
        likes: 0,
        comments: []
      }
      console.log('post = ',newPostObject);
      
    //   setPosts(prevPosts => [newPostObject, ...prevPosts])
    //   setNewPost("")
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
            <Button onClick={submitNewPost}>Post</Button>
          </CardFooter>
        </Card>
     );
}
 
export default CreatePost;