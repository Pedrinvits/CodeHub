import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { auth } from "../../auth";
import { Session_Provider } from "./auth/session-provider";
import Side from "@/components/side";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/navbar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "CodeHub ",
  description: "Seu hub de noticias",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()

  return (
    <Session_Provider session={session}>
      <html lang="pt-br" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-fit bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <Navbar title={""} />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </Session_Provider>
  );
}
