"use client";
import MovieDetails from "@/components/MovieDetails";
import Navbar from "@/components/Navbar";
import SuggestionMovie from "@/components/SuggestionMovie";
import { StateType, useMovieParamsStore } from "@/store/store";
import { useEffect } from "react";

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
