"use client"
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";


const SideBarControl = () => {

    const sidebar = useStore(useSidebar, (x) => x);
    if (!sidebar) return null;
    const { settings, setSettings } = sidebar;

    return (
        <TooltipProvider>
            <div className="flex gap-6 mt-6">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="is-hover-open"
                                onCheckedChange={(x) => setSettings({ isHoverOpen: x })}
                                checked={settings.isHoverOpen}
                            />
                            <Label htmlFor="is-hover-open">Hover Open</Label>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>When hovering on the sidebar in mini state, it will open</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="disable-sidebar"
                                onCheckedChange={(x) => setSettings({ disabled: x })}
                                checked={settings.disabled}
                            />
                            <Label htmlFor="disable-sidebar">Disable Sidebar</Label>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Hide sidebar</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </TooltipProvider>
    );
}

export default SideBarControl;