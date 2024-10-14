import { Navbar } from "@/components/navbar";
import Side from "@/components/side";
import { Sidebar } from "@/components/side/side";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
     return (
          <div className="min-h-screen bg-background font-sans antialiased flex sm:flex-row flex-col">
               <Sidebar />
               {children}
          </div>
     );
}

export default Layout;