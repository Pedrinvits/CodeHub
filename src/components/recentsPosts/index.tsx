import { findposts } from "../../../data/findPost"
import CreatePost from "../create-post"
import Posts from "../posts"

type Comment = {
  id: number
  user: string
  content: string
  timestamp: string
}


const RecentPosts = async () => {
  const samplePosts = await findposts()
  console.log(samplePosts.posts);
  
  return (
    <div className="flex min-h-fit bg-card flex-row sm:flex-col">
      <main className="flex-1 p-4">
        <CreatePost/>
        <Posts prop={samplePosts.posts}/>
      </main>
    </div>
  )
}

export default  RecentPosts 