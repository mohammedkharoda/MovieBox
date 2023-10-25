'use client'
import MovieDetails from "@/components/MovieDetails";
import Navbar from "@/components/Navbar";
import useMovieParamsStore, { StateType } from "@/store/store";
import { useEffect } from "react";

export default function MovieDetail({ params }: any) {
  const setParams = useMovieParamsStore((state: StateType) => state.setParams);
  useEffect(() => {
    setParams(params.id);
  }, [params.id]);

  return (
    <div className="">
      <MovieDetails/>
    </div>
  );
}
