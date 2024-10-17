"use client"
import { Heart, MessageCircle, Share2, Send, EllipsisVertical, MoreVertical, Edit, Trash2, MoveRight, ChevronRight, Bookmark, X, ImagePlus, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from "react";
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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { toast } from "@/hooks/use-toast";
import { updateSavedPosts } from "../../../data/save-post/salvePost";
import Image from "next/image";
import { useImageUpload } from "@/hooks/useImageUpload";
import { Label } from "../ui/label";

const PostComponent = ({ prop }: any) => {
  
  const  {data}  = useSession()
  const current_user_id  = data?.id;
  
  type EditContentProps = {
      title : string,
      description : string,
      imageUrl : string,
  }
  const [activeCommentSection, setActiveCommentSection] = useState<number | null>(null);
  const [newComment, setNewComment] = useState<string>("");
  const [posts, setPosts] = useState<any[]>(prop || []);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<EditContentProps | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [likes, setLikes] = useState<{ [key: number]: number }>({});
  const [userLikes, setUserLikes] = useState<{ [key: number]: boolean }>({});
  const [comments, setComments] = useState<{ [key: number]: number }>([]);
  const [commentCount, setCommentCount] = useState<{ [key: number]: number }>({});
  const [canComment, setCanComment] = useState<Boolean>(false);
  const [postsaved, setSavedPost] = useState<{ [key: number]: boolean }>({});
  const [newPhoto, setNewPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>("");
  const [loading,SetLoading] = useState(false)

  const { imgURL, progressPorcent, uploadImage } = useImageUpload();
  
  const individualPost = usePathname().startsWith('/posts/')

  useEffect(() => {
    if (Array.isArray(prop)) {
        if(individualPost){
          setCanComment(true);
        }
        else {
          setCanComment(false); 
        }
      setPosts(prop);
      // Inicializa os likes e userLikes
      const initialLikes: { [key: number]: number } = {};
      const initialUserLikes: { [key: number]: boolean } = {};
      const initialUserSaves: { [key: number]: boolean } = {};
      const initialComments = {};
      const initialcommentCount: { [key: number]: number } = {}; // Corrige aqui
      
      prop.forEach((post: any) => {
        // Define o número de likes por post
        initialLikes[post.id] = post._count?.postLikes || 0;
        
        // Verifica se o usuário atual deu like no post
        const userHasLiked = post.postLikes?.some(
          (like: any) => like.userId == current_user_id
          
        );
        const userHasSaved = post.savedByUsers?.some(
          (save: any) => save.userId == current_user_id
        );
        // console.log(post);
        
        initialUserLikes[post.id] = userHasLiked;
        initialUserSaves[post.id] = userHasSaved;
        initialComments[post.id] = post.coments || [];
        initialcommentCount[post.id] = initialComments[post.id].length;
        
      });
      
      setSavedPost(initialUserSaves)
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
    async (postId: number, userId: number) => { 
      if (newComment.trim()) {
        const response = await createComments(postId, newComment.trim(), Number(userId));
                
        if (response?.success) {
          const newCommentData = {
            id: response.comment.id,  
            user: {
              username: response.comment.user.username,  
            },
            coment: newComment.trim(),
          };
          const updatedPosts = posts.map((post: any) =>
            post.id === postId
              ? {
                  ...post,
                  comments: [
                    ...(post.comments || []),
                    {
                      id: response.comment.id, 
                      user: {
                        username: response.comment.user.username, 
                      },
                      coment: newComment.trim(), 
                      created_at: new Date(), 
                      // coment_likes: 0,
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
          setComments((prevComments) => ({
            ...prevComments,
            [postId]: [...(prevComments[postId] || []), newCommentData],  
          }) as any);
          
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
    setEditedContent(
      {
        title :  post.title,
        description : post.description,
        imageUrl: post.imageUrl || null,
      }
    )
  };

const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    setNewPhoto(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result as string);
      setEditedContent((prev) => ({
        ...prev,
        image: imgURL,
      }) as any);
    };
    reader.readAsDataURL(file);
  }
};
const handlePhotoSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
  event.preventDefault();
  // SetLoading(true)

  const fileInput = event.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
  const file = fileInput?.files?.[0] || null;

  if (file) {
      uploadImage(file, async (imgURL) => {
        // console.log(imgURL);
      });
  }
}; 
  const handleSave = async (postId: number) => {
    SetLoading(true)
    const fileInput = event.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
    const file = fileInput?.files?.[0] || null;

    if (file) {
      uploadImage(file, async (imgURL) => {
        const res = await editpost(postId, editedContent?.title, editedContent?.description, imgURL);
        SetLoading(false)
        if (res.success) {
          const updatedPosts = posts.map((post: any) =>
            post.id === postId ? { ...post, title:editedContent?.title ,description: editedContent?.description,imageUrl:imgURL  } : post
          );
          toast({
            title : 'Post Editado com sucesso!'
          })
          setPosts(updatedPosts);
          setEditingPostId(null);
          setEditedContent({title : "",description : "", imageUrl: ""});
        }
      });
    }else{
        const res = await editpost(postId, editedContent?.title, editedContent?.description, '');
        SetLoading(false)
        if (res.success) {
          const updatedPosts = posts.map((post: any) =>
            post.id === postId ? { ...post, title:editedContent?.title ,description: editedContent?.description,imageUrl:''  } : post
          );
          toast({
            title : 'Post Editado com sucesso!'
          })
          setPosts(updatedPosts);
          setEditingPostId(null);
          setEditedContent({title : "",description : "", imageUrl: ""});
        }
    }
  };

  const handleRemove = async (post_id: any) => {
    const res = await deletepost(post_id);
    if (res.success) {
      const updatedPosts = posts.filter((post: any) => post.id !== post_id);
      setPosts(updatedPosts);
      toast({
        title : "Post removido com sucesso!"
      })
    }
  };
  const handleRemoveImage = () => {
    setPhotoPreview(null)
    setEditedContent((prev) => ({
      ...prev,
      imageUrl: null,
    }) as any);
  };

  const handlePostsave = async (post_id : any) => {
    const res = await updateSavedPosts(Number(post_id))
    const userSave = userLikes[Number(post_id)] || false;
    if(res.success){
      toast({
        title : 'Post salvo com suceso!'
      })
      setSavedPost((prev) => ({
        ...prev,
        [post_id]: !userSave, 
      }));
    }
    
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
    // console.log(posts);
    
  return (
    <>
      {posts.map((post: any) => (
        <Card key={post.id} className="w-full mx-auto shadow-lg">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex w-full justify-between">
              <div className="flex gap-4 items-center justify-center">
                <Avatar>
                  <AvatarImage src={post.author?.profileImageUrl ? post.author?.profileImageUrl : ''} alt={`${post.user}'s avatar`} />
                  <AvatarFallback>{post.author?.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <Link href={`/profile/${post.author?.username}`}>
                  <div>
                      <p className="font-medium hover:underline">{post.author?.name}</p>
                      <p className="text-sm text-muted-foreground hover:underline">@{post.author?.username}</p>
                  </div>
                </Link>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {current_user_id == post.author.id && (
                    <>
                      <DropdownMenuItem onClick={() => handleEdit(post)}>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleRemove(post.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Remove</span>
                  </DropdownMenuItem>
                    </>
                   )}
                  <DropdownMenuItem onClick={() => handlePostsave(post.id)}>
                    {
                      postsaved[post.id] ? 
                        <>
                          <Bookmark className="mr-2 h-4 w-4" fill="currentColor" />
                          <span>Unsave</span>
                        </>
                         : 
                      (
                        <>
                          <Bookmark className="mr-2 h-4 w-4" />
                          <span>Save</span>
                        </>
                      )
                    }
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <p className="font-semibold">{post.user}</p>
            </div>
          </CardHeader>
          <CardContent>
            {editingPostId === post.id ? (
              <>
                <div className="flex flex-col gap-4">
                  <Input 
                    placeholder="title" 
                    value={editedContent?.title || ""} 
                    onChange={(e) =>
                      setEditedContent((prev) => ({
                        ...prev,                   
                        title: e.target.value 
                      }) as EditContentProps)
                    }
                    />
                  <Textarea
                    placeholder="What's on your mind?"
                    value={editedContent?.description || ""}
                    onChange={(e) =>
                      setEditedContent((prev) => ({
                        ...prev,                  
                        description: e.target.value 
                      }) as EditContentProps)
                    }
                    rows={3}
                    className="w-full"
                  />
                 {(!editedContent?.imageUrl && photoPreview) && (
                   <>
                    <div className="mb-4 relative">
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="relative top-[40px] right-0 bg-gray-800 bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75 transition-opacity m-2"
                      >
                        <X size={16} />
                      </button>
                        <Image src={photoPreview} alt="" width={0} height={0} className="w-full"  unoptimized/>
                    </div> 
                   </>
                 )}
                  {editedContent?.imageUrl ? (
                    <>
                      <div className="mb-4 relative">
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="relative top-[40px] right-0 bg-gray-800 bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75 transition-opacity m-2"
                        >
                          <X size={16} />
                        </button>
                          <Image src={post?.imageUrl} alt="foto post" width={0} height={0} className="w-full"  unoptimized/>
                      </div>  
                    </>
                  ) : (
                    <>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                        id="photo-upload"
                      />
                      <Label htmlFor="photo-upload" className="cursor-pointer px-4 py-2 rounded-md flex items-center border w-fit">
                      <ImagePlus size={14} className="mr-2" />
                      Upload Photo
                      </Label>
                    </>
                  )}
                  <Button onClick={() => handleSave(post.id)} className="mt-2 max-w-fit">
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save Edit'}
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-4">
                <p className="text-xl text-primary">{post.title}</p>
                <p className="text-lg text-muted-foreground">{post.description}</p>
                {post?.imageUrl && (
                  <Image src={post?.imageUrl} alt="foto post" width={0} height={0} className="w-full"  unoptimized/>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="flex justify-between w-full">
              <div className="flex gap-4 item-center justify-center">
                <Button variant="ghost" size="sm" onClick={()=>handleLike(post.id)}>
                  {userLikes[post.id] ? <Heart className="w-4 h-4 mr-2" color={`#ad0026`} /> : <Heart className="w-4 h-4 mr-2" />}
                  {/* <Heart className="w-4 h-4 mr-2" color={`#ad0026`} /> */}
                  <p>{likes[post.id]}</p>
                </Button>
                <div className="flex items-center justify-center gap-2">
                  <MessageCircle  size={17} />{commentCount[post.id] || 0}
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Bookmark className="w-4 h-4 mr-2" /> {post.saves}
                </div>
                <div className="flex items-center justify-center gap-2">
                  <p className="text-sm text-slate-400 font-mb">{format(post.created_at,'dd/MM/yyyy')}</p>
                </div>
              </div>              
              {
                canComment ?  (
                  <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCommentSection(post.id)}
                        aria-expanded={activeCommentSection === post.id}
                        aria-controls={`comments-${post.id}`}
                    >
                        Comentar
                    </Button>
                ) : (
                      <Link href={`/posts/${post.id}`} className="flex flex-row gap-4 items-center"><ChevronRight size={17} /></Link>
                )
              }
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
                          {comments?.map((comment : any) => (
                            <Comment 
                              postId={postId} 
                              content={comment.coment} 
                              comment_id={comment.id} 
                              coment_username={comment.user?.username} 
                              coment_profileImageUrl={comment.user?.profileImageUrl} 
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