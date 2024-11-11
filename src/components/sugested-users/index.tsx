import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import FollowButton from "../follow-button";
import UnfollowButton from "../unfollow-button";
import Link from "next/link";
import { useState } from "react";
import { Check, UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import { followUser, unfollowUser } from "../../../data/following/followUser";
import { toast } from "@/hooks/use-toast";

type SuggestedUsersProps = {
    list: [
        id: string,
        name: string,
        username: string,
        profileImageUrl: string
    ],
    current_user_id: string
}
const SuggestedUsers = ({ list, current_user_id }: SuggestedUsersProps) => {
    const [usuarioBuscadoJaEhSeguido, setusuarioBuscadoJaEhSeguido] = useState(false)
    const [addedFriends, setAddedFriends] = useState<number[]>([])
    
    const filteredList = list.filter(
        (listItem: any) => listItem.id !== current_user_id
    )
    const handleAddFriend = async (userId: number) => {
        // colocar funcao pra gravar a amizade
        // if (!addedFriends.includes(userId)) {
        if (!usuarioBuscadoJaEhSeguido) {
            setAddedFriends([...addedFriends, userId])
            const res = await followUser(userId)
            if(res.success){
                setusuarioBuscadoJaEhSeguido(true)
                toast({
                    title : "Your follow this user now!"
                })
            }
            console.log('if pra seguir');
        }else{
            const res = await unfollowUser(userId)
            if(res.success){
                setusuarioBuscadoJaEhSeguido(false)
                toast({
                    title : "Your unfollow this user now!"
                })
            }
            console.log('else pro unfollow');
        }
       

    }
    return (
        <>
            <ul className="space-y-4 flex flex-col gap-4">
                {filteredList.length > 0 ? (
                    filteredList.map((listItem: any) => (
                        // console.log(listItem)
                        
                        <li key={listItem.id} className="flex items-center gap-2 hover:bg-muted p-3 rounded-lg border shadow-lg">
                            <Avatar className="rounded-lg max-w-12">
                                <AvatarImage src={listItem.profileImageUrl} alt={listItem.username} className="rounded-lg" />
                                <AvatarFallback>{listItem.username?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <Link href={`/profile/${listItem.username}`} className="shadow-lg rounded-md">
                                    <p className="font-medium">{listItem.name}</p>
                                    <p className="text-sm text-muted-foreground">@{listItem.username}</p>
                                </Link>
                            </div>
                            {/* <Button
                            variant={usuarioBuscadoJaEhSeguido ? "secondary" : "default"}
                            size="sm"
                            onClick={() => handleAddFriend(listItem.id)}
                            // disabled={addedFriends.includes(searchResults.id)}
                            >
                            {(list?.following !== '') && (list[0]?.following?.followerId == current_user_id) ? (
                                <>
                                    <Check className="h-4 w-4 mr-1" />
                                    Unfollow
                                </>
                            ) : (
                                <>
                                    <UserPlus className="h-4 w-4 mr-1" />
                                    Follow
                                </>
                            )}
                            </Button> */}
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