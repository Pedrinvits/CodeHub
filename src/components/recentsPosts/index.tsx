"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Share2, Send } from "lucide-react"

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

const RecentPosts = () => {
  const [posts, setPosts] = useState<Post[]>(samplePosts)
  const [activeCommentSection, setActiveCommentSection] = useState<number | null>(null)
  const [newComment, setNewComment] = useState<string>("")
  const [newPost, setNewPost] = useState<string>("")

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
    <div className="flex min-h-fit bg-card flex-row sm:flex-col">
      <main className="flex-1 p-4">
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
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="w-full max-w-2xl mx-auto">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={`${post.user}'s avatar`} />
                  <AvatarFallback>{post.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{post.user}</p>
                  <p className="text-sm text-gray-500">{post.timestamp}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p>{post.content}</p>
              </CardContent>
              <CardFooter className="flex flex-col">
                <div className="flex justify-between w-full">
                  <Button variant="ghost" size="sm">
                    <Heart className="w-4 h-4 mr-2" />
                    {post.likes} Likes
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => toggleCommentSection(post.id)}
                    aria-expanded={activeCommentSection === post.id}
                    aria-controls={`comments-${post.id}`}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {post.comments.length} Comments
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
                {activeCommentSection === post.id && (
                  <div id={`comments-${post.id}`} className="w-full mt-4 space-y-2">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex items-start gap-2 text-sm">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={`${comment.user}'s avatar`} />
                          <AvatarFallback>{comment.user[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="font-semibold">{comment.user}</span>
                          <span className="ml-2 text-gray-500 text-xs">{comment.timestamp}</span>
                          <p>{comment.content}</p>
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-2 mt-2">
                      <Input
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={handleNewComment}
                        aria-label="Add a comment"
                      />
                      <Button size="sm" onClick={() => submitComment(post.id)}>
                        <Send className="w-4 h-4" />
                        <span className="sr-only">Send comment</span>
                      </Button>
                    </div>
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      {/* <aside className="w-64 bg-card p-4 border-l">
        <h2 className="text-xl font-semibold mb-4">Trending</h2>
        <ul className="space-y-2">
          {[1, 2, 3, 4, 5].map((trend) => (
            <li key={trend} className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500">#{trend}</span>
              <span>Trending Topic {trend}</span>
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-4">Suggested Users</h2>
        <ul className="space-y-4">
          {[1, 2, 3].map((user) => (
            <li key={user} className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={`User ${user}'s avatar`} />
                <AvatarFallback>U{user}</AvatarFallback>
              </Avatar>
              <span>User {user}</span>
              <Button variant="outline" size="sm" className="ml-auto">
                Follow
              </Button>
            </li>
          ))}
        </ul>
      </aside> */}
    </div>
  )
}

export default  RecentPosts 