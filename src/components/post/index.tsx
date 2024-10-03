"use client"
import { Heart, MessageCircle, Share2, Send, EllipsisVertical, MoreVertical, Edit, Trash2, MoveRight, ChevronRight } from "lucide-react";
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
const PostComponent = ({ prop }: any) => {

  const [activeCommentSection, setActiveCommentSection] = useState<number | null>(null);
  const [newComment, setNewComment] = useState<string>("");
  const [posts, setPosts] = useState<any[]>([prop]);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (Array.isArray(prop)) {
      setPosts(prop);
    }
  }, [prop]);

  const toggleCommentSection = useCallback((postId: number) => {
    setActiveCommentSection((prevId) => (prevId === postId ? null : postId));
    setNewComment("");
  }, []);

  const handleNewComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const submitComment = useCallback((postId: number) => {
    if (newComment.trim()) {
      const updatedPosts = posts.map((post: any) =>
        post.id === postId
          ? {
            ...post,
            comments: [
              ...post.comments,
              {
                id: post.comments.length + 1,
                user: "Current User",
                content: newComment.trim(),
                timestamp: "Just now",
              },
            ],
          }
          : post
      );
      setPosts(updatedPosts);
      setNewComment("");
    }
  }, [newComment, posts]);

  const handleEdit = (post: any) => {
    setEditingPostId(post.id);
    setEditedContent(post.description);
  };

  const handleSave = async (postId: number) => {
    const res = await editpost(postId, editedContent);
    if (res.success) {
      const updatedPosts = posts.map((post: any) =>
        post.id === postId ? { ...post, description: editedContent } : post
      );
      setPosts(updatedPosts);
      setEditingPostId(null);
      setEditedContent("");
    }
  };

  const handleRemove = async (post_id: any) => {
    const res = await deletepost(post_id);
    if (res.success) {
      const updatedPosts = posts.filter((post: any) => post.id !== post_id);
      setPosts(updatedPosts);
    }
  };

  const handleShare = () => {
    console.log("Share clicked");
  };

  return (
    <>
      {posts.map((post: any) => (
        <Card key={post.id} className="w-full mx-auto">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex w-full justify-between">
              <Avatar>
                <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={`${post.user}'s avatar`} />
                <AvatarFallback>R</AvatarFallback>
              </Avatar>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleEdit(post)}>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleRemove(post.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Remove</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" />
                    <span>Share</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <p className="font-semibold">{post.user}</p>
              <p className="text-sm text-gray-500">{post.title}</p>
            </div>
          </CardHeader>
          <CardContent>
            {editingPostId === post.id ? (
              <>
                <Textarea
                  ref={textareaRef}
                  placeholder="What's on your mind?"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  rows={3}
                  className="w-full"
                />
                <Button onClick={() => handleSave(post.id)} className="mt-2">
                  Save Edit
                </Button>
              </>
            ) : (
              <p>{post.description}</p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="flex justify-between w-full">
              {/* <p>{post.created_at.toString()}</p> */}
              {/* <p className="text-sm text-slate-300">{format(post.created_at,'dd/MM/yyyy')}</p> */}
              <Button variant="ghost" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                {post.likes == null ? 0 : post.likes}
              </Button>
              <Link href={`/posts/${post.id}`}><ChevronRight size={17} /></Link>
              {/* <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCommentSection(post.id)}
                        aria-expanded={activeCommentSection === post.id}
                        aria-controls={`comments-${post.id}`}
                    >
                        <MessageCircle className="w-4 h-4 mr-2" />
                    </Button> */}
              {/* <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                    </Button> */}
            </div>
            {/* {activeCommentSection === post.id && (
                    <div id={`comments-${post.id}`} className="w-full mt-4 space-y-2">
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
                    )} */}
          </CardFooter>
        </Card>
      ))}
    </>
  );
}

export default PostComponent;