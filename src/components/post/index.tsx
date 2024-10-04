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
import { updateLikes } from "../../../data/post/update-post-like";
import { useSession } from "next-auth/react"
import { createComments } from "../../../data/comments/add-comment";
import Comment from '@/components/comment'

const PostComponent = ({ prop }: any) => {
  const  {data}  = useSession()
  const current_user_id  = data?.id;
  
  const [activeCommentSection, setActiveCommentSection] = useState<number | null>(null);
  const [newComment, setNewComment] = useState<string>("");
  const [posts, setPosts] = useState<any[]>([prop]);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [likes, setLikes] = useState<{ [key: number]: number }>({});
  const [userLikes, setUserLikes] = useState<{ [key: number]: boolean }>({});
  const [comments, setComments] = useState<{ [key: number]: number }>([]);
  const [commentCount, setCommentCount] = useState<{ [key: number]: number }>({});


  useEffect(() => {
    if (Array.isArray(prop)) {
      setPosts(prop);
      // Inicializa os likes e userLikes
      const initialLikes: { [key: number]: number } = {};
      const initialUserLikes: { [key: number]: boolean } = {};
      const initialComments = {};
      const initialcommentCount: { [key: number]: number } = {}; // Corrige aqui
      
      prop.forEach((post: any) => {
        // Define o número de likes por post
        initialLikes[post.id] = post._count?.postLikes || 0;
        
        // Verifica se o usuário atual deu like no post
        const userHasLiked = post.postLikes?.some(
          (like: any) => like.userId == current_user_id
          
        );
        initialUserLikes[post.id] = userHasLiked;
        initialComments[post.id] = post.coments || [];
        initialcommentCount[post.id] = initialComments[post.id].length;
        
      });
      
         
      setLikes(initialLikes);
      setUserLikes(initialUserLikes);
      setComments(initialComments);
      setCommentCount(initialcommentCount)
    }
  }, [prop]);
  
/////////////////////////// Comment Actions ///////////////////////////////////////// 
 
  const toggleCommentSection = useCallback((postId: number) => {
    setActiveCommentSection((prevId) => (prevId === postId ? null : postId));
    setNewComment("");
  }, []);

  const handleNewComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
    
  };

  const submitComment = 
  useCallback(
    async (postId: number, userId: number) => { // Adiciona userId como argumento
      if (newComment.trim()) {
        
        // Aqui você pode chamar a função createComments para criar o comentário no banco
        const response = await createComments(postId, newComment.trim(), Number(userId));
  
        if (response?.success) {
          const updatedPosts = posts.map((post: any) =>
            post.id === postId
              ? {
                  ...post,
                  comments: [
                    ...(post.comments || []), // Garante que post.comments seja um array
                    {
                      id: response.comment.id, // Usa o ID do comentário retornado
                      user: {
                        id: userId, // ID do usuário que comentou
                        username: "Current User", // Aqui você pode pegar o nome do usuário logado, se disponível
                      },
                      content: newComment.trim(),
                    },
                  ],
                }
              : post
          );
         
          setPosts(updatedPosts);
          setNewComment(""); 
          setCommentCount((prevCount) => ({
            ...prevCount,
            [postId]: (prevCount[postId] || 0) + 1, 
          }));
          
        } else {
          console.error(response); // Exibe o erro, se houver
        }
      }
    },
    [newComment, posts]
  );
  
  const handleRemoveComment = (postId: number, commentId: string) => {
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: prevComments[postId].filter((comment: any) => comment.id !== commentId),
    }));    
    setCommentCount((prevCount) => ({
      ...prevCount,
      [postId]: (prevCount[postId] || 0) - 1, 
    }));
  };

//////////////////////////////////////////////////////////////////////////////////// 


  /////////////////////////// Post Actions ///////////////////////////////////////// 
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
  /////////////////////////// End Post Actions /////////////////////////////////////////
 
  const handleLike = async (post_id: string) => {
    const userLiked = userLikes[Number(post_id)] || false; // Verifica se o usuário já deu like

    try {
     
      const response = await updateLikes(Number(post_id), Number(current_user_id)); // Chama a função que já existe
      
      // Atualiza o estado de likes
      setLikes((prevLikes) => ({
        ...prevLikes,
        [post_id]: userLiked ? (prevLikes[Number(post_id)] || 0) - 1 : (prevLikes[Number(post_id)] || 0) + 1,
      }));
  
      // // Atualiza o estado de userLikes
      setUserLikes((prevUserLikes) => ({
        ...prevUserLikes,
        [post_id]: !userLiked, // Inverte o estado de like
      }));
  
      // console.log(response); // Mensagem de sucesso
    } catch (error) {
      console.error('Erro ao atualizar likes:', error);
    }
  };
    // console.log(comments);
    
  return (
    <>
      {posts.map((post: any) => (
        <Card key={post.id} className="w-full mx-auto">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex w-full justify-between">
              <div className="flex gap-4 items-center justify-center">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={`${post.user}'s avatar`} />
                  <AvatarFallback>R</AvatarFallback>
                </Avatar>
                <p className="text-sm text-slate-200">{post.author?.username}</p>
              </div>
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
              {/* <p className="text-sm text-slate-300">{format(post.created_at,'dd/MM/yyyy')}</p> */}
              <Button variant="ghost" size="sm" onClick={()=>handleLike(post.id)}>
                {userLikes[post.id] ? <Heart className="w-4 h-4 mr-2" color={`#ad0026`} /> : <Heart className="w-4 h-4 mr-2" />}
                {/* <Heart className="w-4 h-4 mr-2" color={`#ad0026`} /> */}
                <p>{likes[post.id]}</p>
              </Button>
              <div className="flex items-center justify-center gap-2"><MessageCircle  size={17} />{commentCount[post.id] || 0}</div>
              <Link href={`/posts/${post.id}`}><ChevronRight size={17} /></Link>
              <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCommentSection(post.id)}
                        aria-expanded={activeCommentSection === post.id}
                        aria-controls={`comments-${post.id}`}
                    >
                        Comentar
                    </Button>
              {/* <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                    </Button> */}
            </div>
            {activeCommentSection === post.id && (
              <div id={`comments-${post.id}`} className="w-full mt-4 space-y-2 ">
                  <div className="w-full mt-4 space-y-2">
                   {
                    Object.entries(comments).map(([postId, comments]) => {
                      return (
                        <div key={postId} className="flex flex-col gap-4">
                          {comments?.map((comment) => (
                            <Comment 
                              postId={postId} 
                              content={comment.coment} 
                              comment_id={comment.id} 
                              coment_username={comment.user?.username} 
                              onRemoveComment={handleRemoveComment}
                            />
                          ))}
                        </div>
                      );
                    })
                   }
                  </div>
                  <div className="flex gap-2 mt-2">
                  <Input
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={handleNewComment}
                      aria-label="Add a comment"
                  />
                  <Button size="sm" onClick={() => submitComment(post.id,current_user_id)}>
                      <Send className="w-4 h-4" />
                      <span className="sr-only">Send comment</span>
                  </Button>
                  </div>
              </div>
              )}
          </CardFooter>
        </Card>
      ))}
    </>
  );
}

export default PostComponent;