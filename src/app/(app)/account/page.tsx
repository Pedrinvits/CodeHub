import AccountSettings from "@/components/accountSettings";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AlertCircle } from "lucide-react";
import { auth } from "../../../../auth";
import { getUserById } from "../../../../data/user";
import { ThemeSelect } from "@/components/mode-toggle/ThemeSelect";
import DeleteAccount from "@/components/deleteAccount";


const AccountPage = async () => {
    const session: any = await auth();
    const user: any = await getUserById(parseInt(session?.id));
    // console.log(user.profileImageUrl);
    return (
        <div className="flex h-fit p-2 sm:w-3xl sm:mx-auto ">
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-card rounded-lg shadow-lg mt-6">
                <Tabs defaultValue="general" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="appearance">Appearance</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                        <TabsTrigger value="danger">Danger Zone</TabsTrigger>
                    </TabsList>
                    <TabsContent value="general">
                        <AccountSettings name={user.name} email={user.email} photo_user_profile={user.profileImageUrl} />
                    </TabsContent>
                    <TabsContent value="appearance">
                        <Card>
                            <CardHeader>
                                <CardTitle>Appearance</CardTitle>
                                <CardDescription>Customize your account appearance.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <ThemeSelect />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="notifications">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notification Settings</CardTitle>
                                <CardDescription>Manage your notification preferences.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* <div className="flex items-center space-x-2">
                                        <Switch id="email-notifications" />
                                        <Label htmlFor="email-notifications">Email Notifications</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch id="push-notifications" />
                                        <Label htmlFor="push-notifications">Push Notifications</Label>
                                    </div> */}
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="danger">
                        <Card>
                            <CardHeader>
                                <CardTitle>Danger Zone</CardTitle>
                                <CardDescription>Once you delete your account, there is no going back. Please be certain.   </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="rounded-md border border-destructive p-4">
                                    <div className="flex items-center space-x-2">
                                        <AlertCircle className="h-5 w-5 text-destructive" />
                                        <h3 className="font-medium">Delete Account</h3>
                                    </div>
                                    <DeleteAccount name={user.name} />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}

export default AccountPage;