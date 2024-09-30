'use client'

import { SignOut } from "@/action/SignOut";
import { LogOutIcon } from "lucide-react";
import { Button } from "../ui/button";

const LogoutButton = () => {
    const handleLogoutClick = async () => {
        await SignOut();
      };
    return ( 
        <Button onClick={handleLogoutClick} className="w-full">
          <LogOutIcon className="h-5 w-5 mr-2" />
                Logout
        </Button>
     );
}
 
export default LogoutButton;