import { assets } from "@/public/assets";
import { useMovieParamsStore } from "@/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Movie {
  id: number;
  poster_path: string | null;
  title: string;
}

const SuggestionMovie = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [expanded, setExpanded] = useState(false); // New state to control expansion
  const params = useMovieParamsStore((state) => state.params);
  const router = useRouter();
  useEffect(() => {
    async function fetchSimilarMovies(movieId: number) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      };

      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
          options
        );

        if (response.ok) {
          const responseData = await response.json();
          setMovies(responseData.results);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (params !== null) {
      fetchSimilarMovies(params); // Fetch data if params are available
    }
  }, [params]);

  const displayedMovies = expanded ? movies : movies.slice(0, 8);

  return (
    <div className="flex flex-col px-10 mt-[70px]">
      <div className="font-sans text-[36px] font-black">Recommanded Movie</div>
      {/*@ts-ignore*/}
      {isLoading ? (
        <div className="w-full h-[280px]">
          <Image
            src={assets.icon.SPINNER}
            alt="Loading..."
            width={200}
            height={200}
            className="mx-auto"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="flex gap-8 flex-wrap">
          {displayedMovies.map((movie, index) => (
            <div className="flex flex-col" key={index}>
              <div className="h-[570px] w-[400px] relative mt-5">
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                  alt={movie.title}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  loading="lazy"
                  className="rounded-xl cursor-pointer hover:scale-105 transition ease-in-out duration-200"
                  onClick={() => {
                    router.push(`/movie/${movie.id}`);
                  }}
                />
              </div>
              <div className="mt-5 flex flex-col gap-2">
                <p className="text-xl font-bold break-words w-[250px] capitalize">
                  {movie.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add an expansion button */}
      {!expanded && movies.length > 6 && (
        <button
          onClick={() => setExpanded(true)}
          className="mt-3 bg-blue-500 text-white px-3 py-2 rounded-lg w-fit mx-auto mb-10"
        >
          Show More
        </button>
      )}
    </div>
  );
};

export default SuggestionMovie;
