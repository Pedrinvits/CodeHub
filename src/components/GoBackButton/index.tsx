import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";


const GoBackButton = () => {
    return ( 
        <Button>
            <Link href={'/'}><ArrowLeft size={20} /></Link>
        </Button>
     );
}
 
export default GoBackButton;