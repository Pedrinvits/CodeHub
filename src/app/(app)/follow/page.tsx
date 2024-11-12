"use client"
import { useEffect, useState } from "react"
import { Search, UserPlus, Check, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getUserByUsername, getUsers, getUsersNotFollowing } from "../../../../data/user"
import SuggestedUsers from "@/components/sugested-users"
import { useSession } from "next-auth/react"
import { toast } from "@/hooks/use-toast"
import { User } from "@prisma/client"
import { followUser, unfollowUser } from "../../../../data/following/followUser"

export default function Component() {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState<User | null>(null)
    const [users, setUsers] = useState<User[]>([])
    const [addedFriends, setAddedFriends] = useState<number[]>([])
    const [isSearching, setIsSearching] = useState(false)
    const [followStatus, setFollowStatus] = useState<Map<number, boolean>>(new Map()) // Mapa de estado de follow
    const { data } = useSession()
    const current_user_id = data?.id;

    const handleSearch = async () => {
        if (searchTerm.trim() === "") return
        setIsSearching(true)
        try {
            const results = await getUserByUsername(searchTerm)

            if (!results) {
                toast({
                    variant: "destructive",
                    title: 'User not found',
                })
                return
            }
            if (results.id == current_user_id) {
                toast({
                    title: 'The user you are searching cannot be you',
                    description: 'Please try another user that is not you'
                })
                return
            }
            
            // Verifica se o usuário já está seguido
            if (results?.following !== '' && (results?.following[0]?.followerId == current_user_id)){
                setFollowStatus(prev => prev.set(results.id, true))   
            } else {
                setFollowStatus(prev => prev.set(results.id, false))
            }

            setSearchResults(results)
        } catch (error) {
            console.error("Error searching users:", error)
        } finally {
            setIsSearching(false)
        }
    }

    const handleAddFriend = async (userId: number) => {

        const isFollowed = followStatus.get(userId);

        if (!isFollowed) {
            // Seguindo o usuário
            setFollowStatus(prev => prev.set(userId, true));
            const res = await followUser(userId);
            if (res.success) {
                setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
                toast({
                    title: "You followed this user now!"
                });
            }
        } else {
            // Deixando de seguir
            setFollowStatus(prev => prev.set(userId, false));
            const res = await unfollowUser(userId);
            if (res.success) {
                // setUsers((prevUsers) => [...prevUsers, users.find(user => user.id === userId)!]);
                setAddedFriends((prevFriends) => prevFriends.filter(friendId => friendId !== userId));
                toast({
                    title: "You unfollowed this user now!"
                });
            }
        }
    }

    useEffect(() => {
        const fetch = async () => {
            const res = await getUsersNotFollowing(current_user_id);
            setUsers(res);

            // Inicia o estado de follow para todos os usuários na lista de sugeridos
            res.forEach(user => {
                // Verifique se o usuário está sendo seguido ou não
                setFollowStatus(prev => prev.set(user.id, false));
            });
        }
        fetch();
    }, []);

    return (
        <div className="w-full max-w-md mx-auto p-4 space-y-4">
            <div className="flex sm:flex-row flex-col gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-2 top-[12px] h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search users"
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                </div>
                <Button onClick={handleSearch} disabled={isSearching}>
                    {isSearching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Search"}
                </Button>
            </div>

            {searchResults && (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Search Results</h2>

                    <div key={searchResults.id} className="flex items-center justify-between hover:bg-muted p-3 rounded-lg border shadow-lg">
                        <div className="flex items-center space-x-3">
                            <Avatar>
                                <AvatarImage src={searchResults.profileImageUrl} alt={searchResults.username} />
                                <AvatarFallback>{searchResults.username?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">{searchResults.name}</p>
                                <p className="text-sm text-muted-foreground">@{searchResults.username}</p>
                            </div>
                        </div>
                        <Button
                            variant={followStatus.get(searchResults.id) ? "secondary" : "default"}
                            size="sm"
                            onClick={() => handleAddFriend(searchResults.id)}
                        >
                            {followStatus.get(searchResults.id) ? (
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
                        </Button>
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-4 mt-4">
                <h1 className="mt-4">Suggested Users</h1>
                {users.map((e) => (
                    <div key={e.id} className="flex items-center justify-between hover:bg-muted p-3 rounded-lg border shadow-lg">
                        <div className="flex items-center space-x-3">
                            <Avatar>
                                <AvatarImage src={e.profileImageUrl? e.profileImageUrl : ''} alt={e.username} />
                                <AvatarFallback>{e.username?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">{e.name}</p>
                                <p className="text-sm text-muted-foreground">@{e.username}</p>
                            </div>
                        </div>
                        <Button
                            variant={followStatus.get(e.id) ? "secondary" : "default"}
                            size="sm"
                            onClick={() => handleAddFriend(e.id)}
                        >
                            {followStatus.get(e.id) ? (
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
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}
