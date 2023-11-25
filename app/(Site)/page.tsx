"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ExclusiveVideo from "@/components/ExclusiveVideo";
import TopPeople from "@/components/TopPeople";
import Footer from "@/components/Footer";
import Movie from "@/components/Movie";
import NewArrival from "@/components/NewArrival";
import TvSeries from "@/components/TvSeries";
import UpcomingMovie from "@/components/UpcomingMovie";
import Image from "next/image";
import { assets } from "@/public/assets";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
export const revalidation = 0;
export default function Home() {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const tabletBreakpoint = 768;

    const handleResize = () => {
      setIsMobileView(window.innerWidth < tabletBreakpoint);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobileView && (
        <div className="my-auto py-52 text-center bg-gradient-to-r from-[#FEE8C9] to-[#FEE8C9] h-screen text-black font-bold text-[35px]">
          <p>
            We are working on the mobile Screens until than enjoy on your Tablet
            and Desktop!
          </p>
          <div className="relative h-full w-full">
            <Image
              src={assets.image.MOBILE_VIEW}
              style={{
                objectFit: "cover",
              }}
              fill
              loading="lazy"
              alt="animated-image"
            />
          </div>
        </div>
      )}
      {!isMobileView && (
        <>
          <Navbar />
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
      )}
    </>
  );
}
