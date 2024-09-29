import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { MapPin, LinkIcon, Calendar } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

type ProfileInfosProps = { 
    userProfile : {
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
}
const ProfileInfos = ({userProfile} : ProfileInfosProps) => {
    return ( 
        <Card className="mb-8">
            <div className="relative h-48 bg-foreground">
              <img
                src={userProfile ? userProfile?.coverImageUrl : ''}
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-16 left-4">
                <Avatar className="w-32 h-32 border-4 border-white">
                  <AvatarImage src={userProfile ? userProfile?.coverImageUrl : ''} alt={ userProfile ? userProfile.name : ''} />
                  <AvatarFallback>{userProfile ? userProfile.name.split(' ').map(n => n[0]).join('') : ''}</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <CardContent className="pt-20">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold">{userProfile?.name}</h1>
                  <p className="text-gray-500">{userProfile?.username}</p>
                </div>
                <Button>Edit profile</Button>
              </div>
              <p className="mb-4">{userProfile?.bio}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {userProfile?.location}
                </span>
                <span className="flex items-center">
                  <LinkIcon className="w-4 h-4 mr-1" />
                  <a href={userProfile?.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {userProfile?.website}
                  </a>
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {userProfile?.joinDate.toLocaleDateString()} 
                </span>
              </div>
              <div className="flex gap-4 text-sm">
                <span><strong>{userProfile?.following}</strong> Following</span>
                <span><strong>{userProfile?.followers}</strong> Followers</span>
              </div>
            </CardContent>
          </Card>
     );
}
 
export default ProfileInfos;