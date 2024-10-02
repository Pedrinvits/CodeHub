"use client"
import { followUser } from "../../../data/following/followUser";
import { isFollowing } from "../../../data/following/isFollowing";
import { Button } from "../ui/button";

const FollowButton =  ({followerId,followingId} : any) => {
      
    const handleFollowUser = async () => {
        await followUser(followerId,followingId)
    }
    
    return (
        <Button variant="outline" size="sm" className="ml-auto" onClick={()=>handleFollowUser()}>
            Follow
        </Button>
    )
    
}

export default FollowButton;