"use client"
import { MoreVertical, Edit, Trash2, Share2 } from "lucide-react";
import post from "../post";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useState } from "react";
import { deleteComment } from "../../../data/comments/delete-comment";

type commentProps = {
    postId: string;
  content: string;
  coment_username: string;
  comment_id: string;
  onRemoveComment: (postId: number, commentId: string) => void;
  onAddnewComment?: (postId: number, commentId: string) => void;
}
const Comment = ({ postId, content, comment_id, coment_username, onRemoveComment }: commentProps) => {
    const [editingPostId, setEditingPostId] = useState<number | null>(null);
    const [editedContent, setEditedContent] = useState("");
    
    const handleEdit = (post: any) => {
        setEditingPostId(post.id);
        setEditedContent(post.description);
    };
    
    const handleSave = async (postId: number) => {
        // const res = await editpost(postId, editedContent);
        // if (res.success) {
        //     const updatedPosts = posts.map((post: any) =>
        //         post.id === postId ? { ...post, description: editedContent } : post
        //     );
        //     setPosts(updatedPosts);
        //     setEditingPostId(null);
        //     setEditedContent("");
        // }
    };

    const handleRemove = async (comment_id: any) => {
        const res = await deleteComment(comment_id);
        onRemoveComment(Number(postId), comment_id);
        // onRemovenewComment()
    };

    const handleShare = () => {
        console.log("Share clicked");
    };
    return (
        <Card className="">
            <CardHeader className="flex flex-row justify-between items-center">
                <p>{coment_username}</p>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(comment_id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRemove(comment_id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Remove</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleShare}>
                            <Share2 className="mr-2 h-4 w-4" />
                            <span>Share</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent>
                <p>{content}</p>
            </CardContent>

        </Card>
    );
}

export default Comment;