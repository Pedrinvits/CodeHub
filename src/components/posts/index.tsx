"use client";
import { Heart, MessageCircle, Share2, Send, EllipsisVertical, MoreVertical, Edit, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { useCallback, useEffect, useRef, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { deletepost } from "../../../data/deletePost";
import { Textarea } from "../ui/textarea";
import { editpost } from "../../../data/editPost";
import { format } from 'date-fns';
import Link from "next/link";
import Post from "../post";
import PostComponent from "../post";
const FeedPosts = ({ prop }: any) => {
  const [activeCommentSection, setActiveCommentSection] = useState<number | null>(null);
  const [newComment, setNewComment] = useState<string>("");
  const [posts, setPosts] = useState<any[]>([]);
  const [editingPostId, setEditingPostId] = useState<number | null>(null); 
  const [editedContent, setEditedContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
