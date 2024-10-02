import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getUserFollowing } from "../../../data/following/getUserFollowers";
import FollowButton from "../follow-button";
import UnfollowButton from "../unfollow-button";

type SuggestedUsersProps = {
    list : {
        isFollowed: string;
        id: string;
        name: string;
    }
}
const SuggestedUsers = async ({ list, current_user_id }: any) => {
    // console.log(list);
    
    return (
        <>
            <h2 className="text-xl font-semibold mt-6 mb-4">Suggested Users</h2>
            <ul className="space-y-4">
                {list?.map((list : any) => (
                    <li key={list.id} className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={`list ${list}'s avatar`} />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <span>{list.name}</span>
                        {list.isFollowed ? <UnfollowButton followerId = {current_user_id} followingId = {list.id} /> : <FollowButton followerId = {current_user_id} followingId = {list.id}/>}
                    
                    </li>
                ))}
            </ul>
        </>
    );
}

export default SuggestedUsers;