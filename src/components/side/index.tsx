import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { LogOutIcon, SettingsIcon, UserRound } from "lucide-react"
import { ModeToggle } from "../mode-toggle"
import AccountSettings from "../accountSettings"
import { auth } from "../../../auth"
import { getUserById } from "../../../data/user"

const session = await auth();
const user = await  getUserById(parseInt(session?.id))
console.log('EMAIL ANTES DA FUNCAO = ',user?.email);
console.log('NOME ANTES DA FUNCAO = ',user?.name);

export default function Component() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:block border-r w-[16rem]">
        <div className="flex h-full flex-col justify-between px-6 py-4">
          <div className="mb-4"><ModeToggle/></div>
          <nav className="flex flex-col gap-2">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              prefetch={false}
            >
              <HomeIcon className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              prefetch={false}
            >
            <UserRound className="h-4 w-4"/>
             
              Profile
            </Link> 
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              prefetch={false}
            >
              <UsersIcon className="h-4 w-4" />
              Contact
            </Link>
          </nav>
          <div className="mt-auto space-y-2 border-t pt-4">
            <Button variant="outline" className="w-full">
                <LogOutIcon className="h-5 w-5 mr-2" />
                Logout
            </Button>
                <div className="w-full flex ">
                <AccountSettings/>
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
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  prefetch={false}
                >
                  <FileIcon className="h-4 w-4" />
                  About
                </Link> 
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  prefetch={false}
                >
                  <UsersIcon className="h-4 w-4" />
                  Contact
                </Link>
              </nav>
              <div className="mt-auto space-y-2 border-t pt-4">
                <Button variant="outline" className="w-full">
                    <LogOutIcon className="h-5 w-5 mr-2" />
                    Logout
                </Button>
                <AccountSettings email={user?.email} name={user?.name} />
                </div>
            </SheetContent>
          </Sheet>
        </header>
        <main className="p-4 md:p-6">
          <h1 className="text-2xl font-bold">Welcome, {session?.user?.name}!</h1>
          <p className="mt-2 text-muted-foreground">Explore our news</p>

        </main>
      </div>
    </div>
  )
}

function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}


function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}


function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}


function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}