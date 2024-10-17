import ProfileInfos from "@/components/profile-infos"
import SocialProfile from "@/components/social-profile"
import { auth } from "../../../../auth";
import { getUserById } from "../../../../data/user";
import GoBackButton from "@/components/GoBackButton";

type user = {
  name: string
  username: string
  bio: string
  location: string
  website: string
  joinDate: Date
  followers: number
  following: number
  profileImageUrl: string
  coverImageUrl: string
  
}
export default async function SocialNetworkLayout() {
  const session : any = await auth();
  const user:any = await  getUserById(parseInt(session?.id))

  return (
    <div className="flex min-h-fit w-full bg-card">
      <main className="flex-1 p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <ProfileInfos userProfile={user}/>
          <SocialProfile/>
        </div>
      </main>
    </div>
  )
}