"use client";
import MovieDetails from "@/components/MovieDetails";
import SuggestionMovie from "@/components/SuggestionMovie";
import { StateType, useMovieParamsStore } from "@/store/store";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
export default function MovieDetail({ params }: any) {
  const setParams = useMovieParamsStore(
    (state: StateType) => state.setParams as any
  );
  useEffect(() => {
    setParams(params.id);
  }, [params.id]);

  return (
    <>
      <Navbar />
      <MovieDetails />
      <SuggestionMovie />
    </>
  );
}
