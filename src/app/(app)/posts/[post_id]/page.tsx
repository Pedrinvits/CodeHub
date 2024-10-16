import GoBackButton from "@/components/GoBackButton";
import { findpost } from "../../../../../data/findPost";
import PostComponent from "@/components/post";
const PostPage = async ({ params }: any) => {
    const post_id = params.post_id
    const { postconvertedToArray } = await findpost(Number(post_id))

    if (!postconvertedToArray) {
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
                <div className="max-w-4xl mx-auto flex flex-col gap-4">
                    {/* <div className="">
                        <GoBackButton/>
                    </div> */}
                    <PostComponent prop={postconvertedToArray} />
                </div>
            </main>
        </div>
    );
}

export default PostPage;