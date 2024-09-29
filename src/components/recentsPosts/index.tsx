"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Share2, Send } from "lucide-react"
import CreatePost from "../create-post"
import Posts from "../posts"

type Comment = {
  id: number
  user: string
  content: string
  timestamp: string
}


const samplePosts: any[] = [
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

const RecentPosts = () => {

  return (
    <div className="flex min-h-fit bg-card flex-row sm:flex-col">
      <main className="flex-1 p-4">
        <CreatePost/>
        <Posts prop={samplePosts}/>
      </main>
    </div>
  )
}

export default  RecentPosts 