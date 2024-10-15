import {
    Tag,
    Users,
    Settings,
    Bookmark,
    SquarePen,
    LayoutGrid,
    LucideIcon,
    UserRound,
    MessageSquare
} from "lucide-react";

type Submenu = {
    href: string;
    label: string;
    active?: boolean;
};

type Menu = {
    href: string;
    label: string;
    active?: boolean;
    icon: LucideIcon;
    submenus?: Submenu[];
};

type Group = {
    groupLabel: string;
    menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
    return [
        {
            groupLabel: "",
            menus: [
                {
                    href: "/",
                    label: "Feed",
                    icon: LayoutGrid,
                    submenus: []
                }
            ]
        },
        {
            groupLabel: "Contents",
            menus: [
                // {
                //     href: "",
                //     label: "Posts",
                //     icon: SquarePen,
                //     submenus: [
                //         {
                //             href: "/posts",
                //             label: "All Posts"
                //         },
                //         {
                //             href: "/posts/new",
                //             label: "New Post"
                //         }
                //     ]
                // },
                {
                    href: "/profile",
                    label: "Profile",
                    icon: UserRound
                },
                {
                    href: "/posts-saves",
                    label: "Saves",
                    icon: Bookmark
                },
                {
                    href: "/contact",
                    label: "Feedback",
                    icon: MessageSquare
                }
            ]
        },
        // {
        //     groupLabel: "Settings",
        //     menus: [
        //         {
        //             href: "/users",
        //             label: "Users",
        //             icon: Users
        //         },
        //         {
        //             href: "/account",
        //             label: "Account",
        //             icon: Settings
        //         }
        //     ]
        // }
    ];
}
