"use client";
import ExclusiveVideo from "@/components/ExclusiveVideo";
import TopPeople from "@/components/TopPeople";
import Footer from "@/components/Footer";
import Movie from "@/components/Movie";
import NewArrival from "@/components/NewArrival";
import TvSeries from "@/components/TvSeries";
import UpcomingMovie from "@/components/UpcomingMovie";

export default function Home() {
  return (
    <>
      <div className="relative">
        <Movie />
      </div>
      <UpcomingMovie />
      <NewArrival />
      <ExclusiveVideo />
      <TvSeries />
      <TopPeople />
      <Footer />
    </>
  );
}
