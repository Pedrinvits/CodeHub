import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Bookmark, FileIcon, HomeIcon, LogOutIcon, MenuIcon, MessageSquare, MountainIcon, SettingsIcon, UserRound, UsersIcon } from "lucide-react"
import { ModeToggle } from "../mode-toggle"
import AccountSettings from "../accountSettings"
import { auth } from "../../../auth"
import { getUserById, getUsers } from "../../../data/user"
import RecentsPosts from "../recentsPosts"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import LogoutButton from "../LogoutButton"
import FollowButton from "../follow-button"
import { getUserFollowing } from "../../../data/following/getUserFollowers"
import SuggestedUsers from "../sugested-users"

export default async function Component() {
  
  const session : any = await auth();
  const user:any = await  getUserById(parseInt(session?.id));

  const recentsUsers = await getUsers();
  
  const idAndNameList = recentsUsers?.map((user: any) => ({
    id: user.id,
    name: user.name,
    username: user.username,
    profileImageUrl: user.profileImageUrl
  }));

  const CurrentUserfollowings: any = await getUserFollowing(parseInt(session?.id));
  const ids_users_seguidos = CurrentUserfollowings.map((u: any) => u.id);
  const idAndNameListWithFollowStatus = idAndNameList?.map((user) => ({
      ...user,
      isFollowed: ids_users_seguidos.includes(user.id) 
  }));
 
  
  return (
    <div className="flex min-h-fit">
      <div className="hidden lg:block border-r w-[16rem]">
        <div className="flex h-full flex-col justify-between px-6 py-4">
          <div className="mb-4"><ModeToggle/></div>
          <nav className="flex flex-col gap-2">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              prefetch={false}
            >
              <HomeIcon className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              prefetch={false}
            >
            <UserRound className="h-4 w-4"/>
             
              Profile
            </Link> 

            <Link
              href="/posts-saves"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              prefetch={false}
            >
            <Bookmark  className="h-4 w-4"/>
              Saves
            </Link> 

            <Link
              href="/contact"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              prefetch={false}
            >
              <MessageSquare  className="h-4 w-4" />
              Feedback
            </Link>
            <aside className="">
            {/* <h2 className="text-xl font-semibold mb-4">Trending</h2>
            <ul className="space-y-2">
              {[1, 2, 3, 4, 5].map((trend) => (
                <li key={trend} className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-500">#{trend}</span>
                  <span>Trending Topic {trend}</span>
                </li>
              ))}
            </ul> */}
            <SuggestedUsers list={idAndNameListWithFollowStatus} current_user_id = {user.id}/>
          </aside>
          </nav>
          <div className="mt-auto space-y-2 border-t pt-4">
                <LogoutButton/>
                <div className="w-full flex ">
                <AccountSettings email={user?.email} name={user?.name} password={user?.password} photo_user_profile={user?.profileImageUrl} />
                </div>
            </div>
        </div>
      </div>
      <div className="flex-1">
        <header className="flex h-14 items-center justify-between border-b bg-muted/40 px-4 lg:hidden">
          <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-2 px-4 py-6">
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  prefetch={false}
                >
                  <HomeIcon className="h-4 w-4" />
                  Home
                </Link>
                <Link
                    href="/profile"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    prefetch={false}
                  >
                  <UserRound className="h-4 w-4"/>
                  
                    Profile
                  </Link> 
                <Link
                  href="/posts-saves"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  prefetch={false}
                >
                <Bookmark  className="h-4 w-4"/>
                  Saves
                </Link> 
                <Link
                  href="/contact"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  prefetch={false}
                >
                  <MessageSquare  className="h-4 w-4" />
                  Feedback
                </Link>
                <aside className="">
                  {/* <h2 className="text-xl font-semibold mb-4">Trending</h2> */}
                  {/* <ul className="space-y-2">
                    {[1, 2, 3, 4, 5].map((trend) => (
                      <li key={trend} className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-500">#{trend}</span>
                        <span>Trending Topic {trend}</span>
                      </li>
                    ))}
                  </ul> */}
                  <h2 className="text-xl font-semibold mt-6 mb-4">Suggested Users</h2>
                  <ul className="space-y-4">
                  {idAndNameList?.map((user) => (
                    <li key={user.id} className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={`User ${user}'s avatar`} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                      <Button variant="outline" size="sm" className="ml-auto">
                        Follow
                      </Button>
                    </li>
                  ))}
                  </ul>
                </aside>
              </nav>
              <div className="mt-auto space-y-2 border-t pt-4">
                <LogoutButton/>
                <AccountSettings email={user?.email} name={user?.name} password={user?.password} photo_user_profile={user?.profileImageUrl} />
                </div>
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </div>
  )
}
