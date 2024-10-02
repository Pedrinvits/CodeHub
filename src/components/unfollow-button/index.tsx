"use client"
import { followUser, unfollowUser } from "../../../data/following/followUser";
import { isFollowing } from "../../../data/following/isFollowing";
import { Button } from "../ui/button";

const UnfollowButton =  ({followerId,followingId} : any) => {
      
    const handleFollowUser = async () => {
        const res = await unfollowUser(followerId,followingId)
        console.log(res);
        
    }
    
    return (
        <Button variant="outline" size="sm" className="ml-auto" onClick={()=>handleFollowUser()}>
            Unfollow
        </Button>
    )
    
}

export default UnfollowButton;