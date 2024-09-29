import { Heart, MessageCircle, Share2, Send } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { useState } from "react";

const Posts = ({prop} : any) => {
    const [activeCommentSection, setActiveCommentSection] = useState<number | null>(null)
    const [newComment, setNewComment] = useState<string>("")
    const [posts, setPosts] = useState(prop)
    const toggleCommentSection = (postId: number) => {
        setActiveCommentSection(prevId => prevId === postId ? null : postId)
        setNewComment("")
      }
      const handleNewComment = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(e.target.value)
      }
      const submitComment = (postId: number) => {
        if (newComment.trim()) {
          setPosts(prevPosts => 
            prevPosts.map(post => 
              post.id === postId
                ? {
                    ...post,
                    comments: [
                      ...post.comments,
                      {
                        id: post.comments.length + 1,
                        user: "Current User",
                        content: newComment.trim(),
                        timestamp: "Just now"
                      }
                    ]
                  }
                : post
            )
          )
          setNewComment("")
        }
      }
    return ( 
        <div className="space-y-4">
          {posts?.map((post) => (
            <Card key={post.id} className="w-full max-w-2xl mx-auto">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={`${post.user}'s avatar`} />
                  <AvatarFallback>{post.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{post.user}</p>
                  <p className="text-sm text-gray-500">{post.timestamp}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p>{post.content}</p>
              </CardContent>
              <CardFooter className="flex flex-col">
                <div className="flex justify-between w-full">
                  <Button variant="ghost" size="sm">
                    <Heart className="w-4 h-4 mr-2" />
                    {post.likes} Likes
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => toggleCommentSection(post.id)}
                    aria-expanded={activeCommentSection === post.id}
                    aria-controls={`comments-${post.id}`}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {post.comments.length} Comments
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
                {activeCommentSection === post.id && (
                  <div id={`comments-${post.id}`} className="w-full mt-4 space-y-2">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex items-start gap-2 text-sm">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={`${comment.user}'s avatar`} />
                          <AvatarFallback>{comment.user[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="font-semibold">{comment.user}</span>
                          <span className="ml-2 text-gray-500 text-xs">{comment.timestamp}</span>
                          <p>{comment.content}</p>
                        </div>
                      </div>
                    ))}
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
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
     );
}
 
export default Posts;