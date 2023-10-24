import Movie from "@/components/Movie";
import Navbar from "@/components/Navbar";
import UpcomingMovie from "@/components/UpcomingMovie";

export default function Home() {
  return (
    <>
      <div className="relative">
        <Navbar />
        <Movie />
      </div>
      <UpcomingMovie />
    </>
  );
}
