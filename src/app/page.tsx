import Image from "next/image";
import { auth, signOut } from "../../auth";
import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CreatePost from "@/components/CreatePost";
import ShowPosts from "@/components/ShowPosts";
import Side from "@/components/side";

export default  async function Home() {
  const session =  await auth()

  return (
    <>
        <Side/>
    </>
  );
}
