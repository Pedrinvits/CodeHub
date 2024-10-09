import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const Notfound = () => {
    return (
        <section className="flex h-screen w-full max-w-4xl mx-auto flex-col gap-4">
            <Card className="w-fit  mt-10 flex flex-col gap-4 sm:mx-auto mx-3">
                <CardHeader>
                    <CardTitle>
                        404 - Page not found
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>We could not find the page you were looking for.</p>
                    <p>Head back to our <Link href={'/'} className="hover:underline">homepage</Link> or contact the suport.</p>
                </CardContent>
            </Card>
        </section>
    );
}

export default Notfound;