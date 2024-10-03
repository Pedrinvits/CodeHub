import { findpost } from "../../../../../data/findPost";
import PostComponent from "@/components/post";
const PostPage = async ({ params }: any) => {
    const post_id = params.post_id
    const { post } = await findpost(Number(post_id))

    if (!post) {
        return (
            <div className="flex min-h-fit w-full bg-card">
                <main className="flex-1 p-4">
                    <div className="max-w-4xl mx-auto">
                        <h1>Post não encontrado!</h1>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="flex min-h-fit w-full bg-card">
            <main className="flex-1 p-4">
                <div className="max-w-4xl mx-auto">
                    <PostComponent prop={post} />
                </div>
            </main>
        </div>
    );
}

export default PostPage;