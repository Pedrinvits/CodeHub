import { ModeToggle } from "@/components/mode-toggle";
import { SheetMenu } from "./sheet-menu";
import { UserNav } from "./user-nav";
import { auth } from "../../../auth";
import { getUserById } from "../../../data/user";


interface NavbarProps {
    title: string;
}

export async function Navbar({ title }: NavbarProps) {
    const data: any = await auth()

    const user = await getUserById(Number(data?.id));

    return (
        <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
            <div className="mx-4 sm:mx-8 flex h-14 items-center">
                <div className="flex items-center space-x-4 lg:space-x-0">
                    <SheetMenu />
                    <h1 className="font-bold">{title}</h1>
                </div>
                <div className="flex flex-1 items-center justify-end gap-4">
                    <ModeToggle />
                    <UserNav username={user?.username} email={user?.email} profileImageUrl={user?.profileImageUrl} />
                </div>
            </div>
        </header>
    );
}
