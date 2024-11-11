"use client"
import { useEffect, useState } from "react"
import { Search, UserPlus, Check, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getUserByUsername, getUsers } from "../../../../data/user"
import SuggestedUsers from "@/components/sugested-users"
import { useSession } from "next-auth/react"
import { toast } from "@/hooks/use-toast"
import { User } from "@prisma/client"
import { followUser, unfollowUser } from "../../../../data/following/followUser"

export default function Component() {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState<User[]>([])
    const [users, setUsers] = useState<User[]>([])
    const [addedFriends, setAddedFriends] = useState<number[]>([])
    const [isSearching, setIsSearching] = useState(false)
    const [usuarioBuscadoJaEhSeguido, setusuarioBuscadoJaEhSeguido] = useState(false)
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
                    title: 'The user you are search cannot be you',
                    description: 'Please try another user that is not you'
                })
                return
            }
        
            if(results?.following !== '' && (results?.following[0]?.followerId == current_user_id)){
                setusuarioBuscadoJaEhSeguido(true)   
            }
            console.log(results);
            
            setSearchResults(results)
           
            
        } catch (error) {
            console.error("Error searching users:", error)
        } finally {
            setIsSearching(false)
        }
    }

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

    useEffect(() => {
        const fetch = async () => {
            const res = await getUsers()
            console.log('res = ',res);
            setUsers(res)
        }
        fetch()
    }, [])
    //   console.log(users);

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

            {searchResults != '' ? (
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
                            variant={usuarioBuscadoJaEhSeguido ? "secondary" : "default"}
                            size="sm"
                            onClick={() => handleAddFriend(searchResults.id)}
                        // disabled={addedFriends.includes(searchResults.id)}
                        >
                            {usuarioBuscadoJaEhSeguido? (
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
            ) : (
                <></>
            )

            }
            <div className="flex flex-col gap-4 mt-4">
                <h1 className="mt-4">Suggested Users</h1>
                {
                    users.map((e)=>
                        <div key={e.id} className="flex items-center justify-between hover:bg-muted p-3 rounded-lg border shadow-lg">
                        <div className="flex items-center space-x-3">
                            <Avatar>
                                <AvatarImage src={e.profileImageUrl} alt={e.username} />
                                <AvatarFallback>{e.username?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">{e.name}</p>
                                <p className="text-sm text-muted-foreground">@{e.username}</p>
                            </div>
                        </div>
                        <Button
                            variant={usuarioBuscadoJaEhSeguido ? "secondary" : "default"}
                            size="sm"
                            onClick={() => handleAddFriend(e.id)}
                        // disabled={addedFriends.includes(searchResults.id)}
                        >
                            {usuarioBuscadoJaEhSeguido? (
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
                    )
                }
            </div>
        </div>
    )
}