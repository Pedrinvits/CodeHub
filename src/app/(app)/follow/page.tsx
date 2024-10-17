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

export default function Component() {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState<User[]>([])
    const [users, setUsers] = useState<User[]>([])
    const [addedFriends, setAddedFriends] = useState<number[]>([])
    const [isSearching, setIsSearching] = useState(false)
    const { data } = useSession()
    const current_user_id = data?.id;

    const handleSearch = async () => {
        if (searchTerm.trim() === "") return
        setIsSearching(true)
        try {
            const results  = await getUserByUsername(searchTerm)

            if(!results){
                toast({
                    variant : "destructive",
                    title: 'User not found',
                })
                return 
            }
            
            setSearchResults(results)

        } catch (error) {
            console.error("Error searching users:", error)
        } finally {
            setIsSearching(false)
        }
    }

    const handleAddFriend = (userId: number) => {
        if (!addedFriends.includes(userId)) {
            setAddedFriends([...addedFriends, userId])
        }
    }

    useEffect(() => {
        const fetch = async () => {
            const res = await getUsers()
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
                            variant={addedFriends.includes(searchResults.id) ? "secondary" : "default"}
                            size="sm"
                            onClick={() => handleAddFriend(searchResults.id)}
                            disabled={addedFriends.includes(searchResults.id)}
                        >
                            {addedFriends.includes(searchResults.id) ? (
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
                <SuggestedUsers list={users} current_user_id={current_user_id}/>
            </div>
        </div>
    )
}