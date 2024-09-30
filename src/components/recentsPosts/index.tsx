"use client"
import { findposts } from "../../../data/findPost"
import CreatePost from "../create-post"
import Posts from "../posts"
import { useEffect, useState } from "react";

const RecentPosts =  () => {
  const [posts, setPosts] = useState("");

  useEffect(()=>{
    const fetch = async () => {
      const samplePosts =  await findposts()
      setPosts(samplePosts.posts as any)
    }
    fetch()
  },[])
  
  return (
    <div className="flex min-h-fit bg-card flex-row sm:flex-col">
      <main className="flex-1 p-4">
        <CreatePost posts={posts} setPosts={setPosts} />
        <Posts prop={posts} />
      </main>
    </div>
  )
}

export default RecentPosts;
