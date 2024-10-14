"use client";
import { MoreVertical, Edit, Trash2, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useState } from "react";
import { deleteComment } from "../../../data/comments/delete-comment";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { editComments } from "../../../data/comments/edit-comment";
import { toast } from "@/hooks/use-toast";

type commentProps = {
  postId: string;
  content: string;
  coment_username: string;
  coment_profileImageUrl: string;
  comment_id: string;
  onRemoveComment: (postId: number, commentId: string) => void;
  onEditComment?: (commentId: string, newContent: string) => Promise<void>;
};

const Comment = ({ postId, content, comment_id, coment_username, coment_profileImageUrl, onRemoveComment, onEditComment }: commentProps) => {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState(content);

  const handleEdit = (commentId: string) => {
    setEditingCommentId(commentId);
    setEditedContent(content);
  };

  const handleSave = async () => {
    if (editingCommentId) {
      const res = await editComments(editingCommentId, editedContent);
      setEditingCommentId(null);
      // setEditedContent()
      setEditedContent(res.comment?.coment);
      if (res.success) {
        setEditingCommentId(null);
        toast({
          title: 'Comentário editado com sucesso!'
        })
      }
    }
  };

  const handleRemove = async (comment_id: string) => {
    await deleteComment(comment_id);
    onRemoveComment(Number(postId), comment_id);
  };

  const handleShare = () => {
    console.log("Share clicked");
  };

  return (
    <Card className="">
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-4 items-center">
          <Avatar>
            <AvatarImage src={coment_profileImageUrl || ""} alt={`${coment_username}'s avatar`} />
            <AvatarFallback>{coment_username.charAt(0)}</AvatarFallback>
          </Avatar>
          <p className="text-sm text-slate-200">{coment_username}</p>
        </div>
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
        {editingCommentId === comment_id ? (
          <div>
            <textarea
              className="w-full text-sm p-2 border rounded"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-2">
              <Button variant="ghost" onClick={() => setEditingCommentId(null)}>Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        ) : (
          <p>{editedContent}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default Comment;
