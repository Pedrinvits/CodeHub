"use client";
import { useEffect, useRef, useState } from "react";
import PostComponent from "../post";
const FeedPosts = ({ prop }: any) => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    setPosts(prop);
  }, [prop]);
  // console.log(posts);
  
  return (
    <div className="space-y-4">
      <PostComponent prop={posts}/>
    </div>
  );
};

export default FeedPosts;
