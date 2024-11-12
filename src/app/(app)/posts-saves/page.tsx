"use client"

import { useEffect, useState } from "react";
import { GetsavedPosts } from "../../../../data/save-post/getSavePost";
import PostComponent from "@/components/post";
import GoBackButton from "@/components/GoBackButton";


interface Post {
  id: number;
  title: string;
  description: string;
  author: {
    username: string;
    profileImageUrl: string;
  };
  coments: Coment[];
  postLikes: PostLike[];
  _count: {
    coments: number;
    postLikes: number;
  };
}

interface Coment {
  id: number;
  coment: string;
  user: {
    username: string;
    profileImageUrl: string;
  };
}

interface PostLike {
  id: number;
  user: {
    username: string;
    profileImageUrl: string;
  };
}

export default function SavedPosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const res = await GetsavedPosts();
        console.log(res);
        if(res){
          setPosts(res.savedPosts);
        }
      } catch (error) {
        console.error("Error fetching saved posts", error);
      }
    };

    fetchSavedPosts();
  }, []);
  

  if (posts?.length == 0) {
    return (
      <div className="min-h-fit mx-auto w-3/4 flex flex-col gap-4bg-card">
        <main className="flex-1 p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="mt-4">
            <GoBackButton />
          </div>
          <h1 className="text-2xl font-bold my-10">You do not have saved posts!</h1>
          </div>
        </main>
      </div>
    )
  }
  return (

    <div className="flex min-h-fit w-full bg-card">
      <main className="flex-1 p-4">
        <div className="max-w-2xl mx-auto space-y-4">
        {/* <div className="mt-4">
        <GoBackButton />
        </div> */}
        <h1 className="text-2xl font-bold my-2">Saved posts</h1>
        <PostComponent prop={posts} />
        </div>
      </main>
    </div>

  );
}
