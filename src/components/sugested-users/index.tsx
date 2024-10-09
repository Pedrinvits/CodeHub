import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getUserFollowing } from "../../../data/following/getUserFollowers";
import FollowButton from "../follow-button";
import UnfollowButton from "../unfollow-button";
import Link from "next/link";

type SuggestedUsersProps = {
    list : [
        isFollowed: string,
        id: string,
        name: string,
        username: string,
        profileImageUrl : string
    ],
    current_user_id : string
}
const SuggestedUsers = async ({ list, current_user_id }: SuggestedUsersProps) => {

    return (
        <>
            <h2 className="text-xl font-semibold mt-6 mb-4">Suggested Users</h2>
            <ul className="space-y-4 flex flex-col gap-4">
            {list?.filter((listItem: any) => listItem.id !== current_user_id).length > 0 ? (
                list
                    ?.filter((listItem: any) => listItem.id !== current_user_id)
                    .map((listItem: any) => (
                        <Link href={`/profile/${listItem.username}`} className="p-2 shadow-lg rounded-md">
                                <li key={listItem.id} className="flex items-center gap-2">
                                <Avatar className="rounded-full max-w-12">
                                    <AvatarImage 
                                        src={listItem.profileImageUrl ? listItem.profileImageUrl : ''} 
                                        alt={`${listItem.name}'s avatar`} 
                                        className="rounded-full"
                                    />
                                    <AvatarFallback>{listItem.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{listItem.username}</span>
                                {listItem.isFollowed ? (
                                    <UnfollowButton followerId={current_user_id} followingId={listItem.id} />
                                ) : (
                                    <FollowButton followerId={current_user_id} followingId={listItem.id} />
                                )}
                            </li>
                        </Link>
                    ))
            ) : (
                <p className="text-sm text-gray-400">No users found</p>
            )}
            </ul>
        </>
    );
}

export default SuggestedUsers;