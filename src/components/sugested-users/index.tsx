import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getUserFollowing } from "../../../data/following/getUserFollowers";
import FollowButton from "../follow-button";
import UnfollowButton from "../unfollow-button";

type SuggestedUsersProps = {
    list : [
        isFollowed: string,
        id: string,
        name: string,
    ],
    current_user_id : string
}
const SuggestedUsers = async ({ list, current_user_id }: SuggestedUsersProps) => {

    return (
        <>
            <h2 className="text-xl font-semibold mt-6 mb-4">Suggested Users</h2>
            <ul className="space-y-4">
            {list?.filter((listItem: any) => listItem.id !== current_user_id).length > 0 ? (
                list
                    ?.filter((listItem: any) => listItem.id !== current_user_id)
                    .map((listItem: any) => (
                        <li key={listItem.id} className="flex items-center gap-2">
                            <Avatar>
                                <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={`${listItem.name}'s avatar`} />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <span>{listItem.name}</span>
                            {listItem.isFollowed ? (
                                <UnfollowButton followerId={current_user_id} followingId={listItem.id} />
                            ) : (
                                <FollowButton followerId={current_user_id} followingId={listItem.id} />
                            )}
                        </li>
                    ))
            ) : (
                <p className="text-sm text-gray-400">No users found</p>
            )}
            </ul>
        </>
    );
}

export default SuggestedUsers;