"use client"
import { findposts } from "../../../data/findPost"
import CreatePost from "../create-post"
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Minus, PlusCircle, XCircle } from "lucide-react";
import PostComponent from "../post";

const RecentPosts =  () => {
  const [posts, setPosts] = useState("");
  const [showCreatePost, setShowCreatePost] = useState(false);

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
        <div className="max-w-3xl mx-auto flex flex-col">
          <Button 
            onClick={() => setShowCreatePost(!showCreatePost)} 
            className="self-end mb-4"
          >
          {showCreatePost ? (
            <div className="flex items-center justify-between">
              <Minus className="mr-2 h-4 w-4" />
              <p>Cancelar</p>
            </div> 
          ) : 
          ( 
            <div className="flex items-center justify-between">
              <PlusCircle className="mr-2 h-4 w-4" />
              <p>Criar post</p>
            </div> 
          )}
          </Button>
         {showCreatePost && <CreatePost posts={posts} setPosts={setPosts} />}
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          <PostComponent prop={posts}/>
        </div>
      </main>
    </div>
  )
}

export default RecentPosts;
