"use client"
import { Check } from "lucide-react";
import { followUser, unfollowUser } from "../../../data/following/followUser";
import { isFollowing } from "../../../data/following/isFollowing";
import { Button } from "../ui/button";

const UnfollowButton =  ({followerId,followingId} : any) => {
      
    const handleFollowUser = async () => {
        const res = await unfollowUser(followerId,followingId)
        console.log(res);
        
    }
    
    return (
        <Button size="sm" className="ml-auto flex items-center justify-center gap-2" onClick={()=>handleFollowUser()}>
            <Check className="h-4 w-4 mr-1" />
            Unfollow
        </Button>
    )
    
}

export default UnfollowButton;