import Side from "@/components/side";

const Layout = ({children} : Readonly<{children: React.ReactNode}>) => {
    return ( 
        <div className= "min-h-screen bg-background font-sans antialiased flex sm:flex-row flex-col">
             <Side/>
             {children}
        </div>
     );
}
 
export default Layout;