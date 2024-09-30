"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

import { Heart, MessageCircle, Share2, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { findposts } from "../../../data/findPost";
import Posts from "../posts";
import CreatePost from "../create-post";

type Comment = {
    id: number
    user: string
    content: string
    timestamp: string
  }
  
  type Post = {
    id: number
    user: string
    content: string
    timestamp: string
    likes: number
    comments: Comment[]
  }
  
  type Profile = {
    name: string
    username: string
    bio: string
    location: string
    website: string
    joinDate: string
    followers: number
    following: number
    profileImageUrl: string
    coverImageUrl: string
  }
  
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
  
const SocialProfile = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [activeCommentSection, setActiveCommentSection] = useState<number | null>(null)
    const [newComment, setNewComment] = useState<string>("")
    const [newPost, setNewPost] = useState<string>("")

    useEffect(()=>{
        const fetch = async () => {
          const res = await findposts()
          setPosts(res.posts) 
        }
        fetch()
    },[])
    const toggleCommentSection = (postId: number) => {
      setActiveCommentSection(prevId => prevId === postId ? null : postId)
      setNewComment("")
    }
  
    const handleNewComment = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewComment(e.target.value)
    }
  
    const submitComment = (postId: number) => {
      if (newComment.trim()) {
        setPosts(prevPosts => 
          prevPosts.map(post => 
            post.id === postId
              ? {
                  ...post,
                  comments: [
                    ...post.comments,
                    {
                      id: post.comments.length + 1,
                      user: "Current User",
                      content: newComment.trim(),
                      timestamp: "Just now"
                    }
                  ]
                }
              : post
          )
        )
        setNewComment("")
      }
    }
  
    const handleNewPost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setNewPost(e.target.value)
    }
  
    const submitNewPost = () => {
      if (newPost.trim()) {
        const newPostObject: Post = {
          id: posts.length + 1,
          user: "Current User",
          content: newPost.trim(),
          timestamp: "Just now",
          likes: 0,
          comments: []
        }
        setPosts(prevPosts => [newPostObject, ...prevPosts])
        setNewPost("")
      }
    }
    return ( 
        <Tabs defaultValue="posts" className="mb-8">
            <TabsList className="w-full">
              <TabsTrigger value="posts" className="flex-1">Posts</TabsTrigger>
              <TabsTrigger value="media" className="flex-1">Media</TabsTrigger>
              <TabsTrigger value="likes" className="flex-1">Likes</TabsTrigger>
            </TabsList>
            <TabsContent value="posts" className="w-full mx-0">
                <CreatePost posts={posts} setPosts={setPosts}/>
                <Posts prop={posts} />
            </TabsContent>
            <TabsContent value="media">
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold">Media</h2>
                </CardHeader>
                <CardContent>
                  <p>No media posts yet.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="likes">
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold">Likes</h2>
                </CardHeader>
                <CardContent>
                  <p>No liked posts yet.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
     );
}
 
export default SocialProfile;