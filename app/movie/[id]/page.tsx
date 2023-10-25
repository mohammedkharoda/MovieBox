import MovieDetails from "@/components/MovieDetails";
import useMovieParamsStore from "@/store/store";
import { useEffect } from "react";

export default function MovieDetail({ params }: any) {
  const setParams = useMovieParamsStore((state) => state.setParams);
  useEffect(() => {
    setParams(params.id);
  }, [params.id]);

  return (
    <>
      <MovieDetails/>
    </>
  );
}
