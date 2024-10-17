import {
    Tag,
    Users,
    Settings,
    Bookmark,
    SquarePen,
    LayoutGrid,
    LucideIcon,
    UserRound,
    MessageSquare,
    UserRoundPlus
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

export function getMenuList(pathname: string, user_role: string): Group[] {
    const menuList: Group[] = [
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
                },
                {
                    href: "/follow",
                    label: "Follow",
                    icon: UserRoundPlus
                }
            ]
        },
        {
            groupLabel: "Settings",
            menus: [
                {
                    href: "/account",
                    label: "Account",
                    icon: Settings
                }
            ]
        }
    ];
    if (user_role === "SUPPORT") {
        menuList.push({
            groupLabel: "Suport",
            menus: [
               {
                href : "",
                label : "Suport",
                icon : LayoutGrid,
                submenus : [
                    
                    {
                        href: "/admin/manage-users",
                        label: "Manage Users",
                    },
                ]
               }
            ]
        });
    }
    if (user_role === "ADMIN") {
        menuList.push({
            groupLabel: "Admin",
            menus: [
               {
                href : "",
                label : "Admin",
                icon : LayoutGrid,
                submenus : [
                    
                    {
                        href: "/admin/users",
                        label: "Manage Users",
                    },
                    {
                        href: "/admin/dashboard",
                        label: "Dashboard",
                    }
                ]
               }
            ]
        });
    }

    return menuList;
}
