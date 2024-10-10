'use client'
import { findposts } from "../../../data/findPost";
import CreatePost from "../create-post";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Minus, PlusCircle } from "lucide-react";
import PostComponent from "../post";
import { Tabs , TabsContent, TabsList, TabsTrigger} from "../ui/tabs";
import { auth } from "../../../auth";
import { getUserFollowing } from "../../../data/following/getUserFollowers";

const RecentPosts = () => {
  const [posts, setPosts] = useState<any[]>([]); 
  const [Followingposts, setFollowingposts  ] = useState<any[]>([]); 
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [visiblePosts, setVisiblePosts] = useState(3); 
  
  useEffect(() => {
    const fetchPosts = async () => {
      const getUserFollowings: any = await getUserFollowing()

      const CurrentUserIdsfollowings = getUserFollowings?.map((e)=>e.id)
      // console.log(CurrentUserIdsfollowings);
      
      const samplePosts = await findposts();
      const userFollingsPosts =  samplePosts.posts?.filter(e => CurrentUserIdsfollowings.includes(e.authorId))
      setPosts(samplePosts.posts as any); 
      setFollowingposts(userFollingsPosts as any); 
    };
    fetchPosts();
  }, []);

  // console.log(posts);
  
  const loadMorePosts = () => {
    setVisiblePosts((prev) => prev + 3); // Carrega mais 3 posts
  };

  return (
    <div className="flex min-h-fit bg-card flex-row sm:flex-col">
      <main className="flex-1 p-4">
        <div className="max-w-3xl mx-auto flex flex-col">
          <Button 
            onClick={() => setShowCreatePost(!showCreatePost)} 
            className="self-end mb-4"
          >
            {showCreatePost ? (
              <div className="flex items-center justify-between">
                <Minus className="mr-2 h-4 w-4" />
                <p>Cancelar</p>
              </div> 
            ) : 
            ( 
              <div className="flex items-center justify-between">
                <PlusCircle className="mr-2 h-4 w-4" />
                <p>Criar post</p>
              </div> 
            )}
          </Button>
          {showCreatePost && <CreatePost posts={posts} setPosts={setPosts} />}
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
        <Tabs defaultValue="feed" className="mb-8">
        <TabsList className="w-full">
              <TabsTrigger value="feed" className="flex-1">Feed</TabsTrigger>
              <TabsTrigger value="following" className="flex-1">Seguindo</TabsTrigger>
            </TabsList>
            <TabsContent value="feed" className="w-full mx-0 space-y-4">
              <PostComponent prop={posts.slice(0, visiblePosts)} />
              </TabsContent>
            <TabsContent value="following" className="w-full mx-0 space-y-4">
              <PostComponent prop={Followingposts.slice(0, visiblePosts)} />
            </TabsContent>
          </Tabs>
          <div className="flex justify-center">
            {visiblePosts < posts.length && (
              <Button onClick={loadMorePosts} className="mt-4">
                Carregar mais
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecentPosts;
