import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getUserFollowing } from "../../../data/following/getUserFollowers";
import FollowButton from "../follow-button";
import UnfollowButton from "../unfollow-button";
import Link from "next/link";

type SuggestedUsersProps = {
    list: [
        isFollowed: string,
        id: string,
        name: string,
        username: string,
        profileImageUrl: string
    ],
    current_user_id: string
}
const SuggestedUsers = ({ list, current_user_id }: SuggestedUsersProps) => {

    return (
        <>
            <ul className="space-y-4 flex flex-col gap-4">
                {list?.filter((listItem: any) => listItem.id !== current_user_id).length > 0 ? (
                    list
                        ?.filter((listItem: any) => listItem.id !== current_user_id)
                        .map((listItem: any) => (
                            
                            <li key={listItem.id} className="flex items-center gap-2 hover:bg-muted p-3 rounded-lg border shadow-lg">
                                <Avatar className="rounded-full max-w-12">
                                    <AvatarImage src={listItem.profileImageUrl} alt={listItem.username} className="rounded-full" />
                                    <AvatarFallback>{listItem.username?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>

                                    <Link href={`/profile/${listItem.username}`} className="shadow-lg rounded-md">
                                        <p className="font-medium">{listItem.name}</p>
                                        <p className="text-sm text-muted-foreground">@{listItem.username}</p>
                                    </Link>

                                </div>
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