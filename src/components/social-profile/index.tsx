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
import CreatePost from "../create-post";
import { useSession } from "next-auth/react"
import PostComponent from "../post";

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

const SocialProfile = () => {
  const [posts, setPosts] = useState<Post[]>([])

  const { data } = useSession();
  const current_user_id = data?.id;

  useEffect(() => {
    const fetch = async () => {
      const res = await findposts()
      setPosts(res.posts)
    }
    fetch()
  }, [])

  const likedPosts = posts?.filter((post) =>
    post.postLikes?.some((like) => like.userId == current_user_id));

  return (
    <Tabs defaultValue="posts" className="mb-8">
      <TabsList className="w-full">
        <TabsTrigger value="posts" className="flex-1">Posts</TabsTrigger>
        {/* <TabsTrigger value="media" className="flex-1">Media</TabsTrigger> */}
        <TabsTrigger value="likes" className="flex-1">Likes</TabsTrigger>
      </TabsList>
      <TabsContent value="posts" className="w-full mx-0 space-y-4">
        {/* <CreatePost posts={posts} setPosts={setPosts} /> */}
        <PostComponent prop={posts}/>
      </TabsContent>
      {/* <TabsContent value="media">
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold">Media</h2>
                </CardHeader>
                <CardContent>
                  <p>No media posts yet.</p>
                </CardContent>
              </Card>
            </TabsContent> */}
      <TabsContent value="likes">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Likes</h2>
          </CardHeader>
          <CardContent>
            <PostComponent prop={likedPosts} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default SocialProfile;