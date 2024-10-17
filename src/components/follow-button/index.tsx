"use client"
import { UserPlus } from "lucide-react";
import { followUser } from "../../../data/following/followUser";
import { isFollowing } from "../../../data/following/isFollowing";
import { Button } from "../ui/button";

const FollowButton =  ({followerId,followingId} : any) => {
      
    const handleFollowUser = async () => {
        await followUser(followerId,followingId)
    }
    
    return (
        <Button size="sm" className="ml-auto flex items-center justify-center gap-2" onClick={()=>handleFollowUser()}>
            <UserPlus className="h-4 w-4 mr-1" />
            Follow
        </Button>
    )
    
}

export default FollowButton;