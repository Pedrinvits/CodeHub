"use client"

import { useEffect, useState } from "react";
import { GetsavedPosts } from "../../../../data/save-post/getSavePost";
import PostComponent from "@/components/post";


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
        // console.log(res);
        
        // if(res.success){
          const transformedPosts = res?.savedPosts?.map((e: any) => {       
    
            return {
              id: e.postId,
              title: e.post.title,
              description: e.post.description,
              author: {
                username: e.post.author.username,
                profileImageUrl: e.post.author.profileImageUrl,
              },
              commentsCount: e.post._count.coments,
              likesCount:e.post._count.postLikes,
              createdAt: e.post.created_at,
            };
          });
          // console.log(transformedPosts);
          
          
          setPosts(transformedPosts as any);
        // }
        
      } catch (error) {
        console.error("Error fetching saved posts", error);
      }
    };

    fetchSavedPosts();
  }, []);
// console.log(posts);

  return (
      <div className="mx-auto w-3/4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold my-10">Posts salvos</h1>
        <PostComponent prop={posts}/>
      </div>
  );
}
