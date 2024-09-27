import RecentsPosts from "@/components/recentsPosts";
export default  async function Home() {
  return (
    <>
        <main className="p-4 md:p-6 w-full">
            <RecentsPosts/>
        </main>
    </>
  );
}
