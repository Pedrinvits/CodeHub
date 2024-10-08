import GoBackButton from "@/components/GoBackButton";
import { getUserByUsername } from "../../../../../data/user";
import ProfileInfos from "@/components/profile-infos";
import SocialProfile from "@/components/social-profile";

const UserProfile = async ({ params }: any) => {
    const username = params.username
    const user = await getUserByUsername(username)
    console.log(user);
    
    return (
        <div className="flex min-h-fit w-full bg-card">
            <main className="flex-1 p-4">
                <div className="max-w-4xl mx-auto flex flex-col gap-4">
                    <div className="">
                        <GoBackButton />
                    </div>
                    <ProfileInfos userProfile={user}/>
                    <SocialProfile/>
                </div>
            </main>
        </div>
    );
}

export default UserProfile;