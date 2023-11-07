"use client";
import { assets } from "@/public/assets";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import getMovieData from "@/app/api/getMovieData";
import { useEffect, useState } from "react";
interface Movie {
  id: number;
  backdrop_path: string | null;
  poster_path: string | null;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

const MovieDetails = () => {
  const [movieData, setMovieData] = useState<Movie[] | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMovieData();
        setMovieData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  const splideOptions = {
    type: "loop",
    autoplay: true,
    perPage: 1,
    perMove: 1,
    pagination: false,
    navigation: false,
    arrows: false,
    direction: "ttb",
    height: "100vh",
  };

  const router = useRouter();
  const handleResultClick = (id: any) => {
    router.push(`/movie/${id}`);
  };

  const handleImageLoad = () => {
    setImagesLoaded(true);
  };

  return (
    <div className="relative">
      {!imagesLoaded ? (
        // @ts-ignore
        <Splide options={splideOptions}>
          {movieData &&
            movieData?.length > 0 &&
            movieData.map((movie: any) => (
              <SplideSlide key={movie.id}>
                <div className="relative h-full w-full">
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${
                      movie?.backdrop_path || movie?.poster_path
                    }`}
                    alt={movie.title}
                    style={{
                      objectFit: "cover",
                    }}
                    fill
                    loading="lazy"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60" />
                </div>
                <div className="px-6 absolute top-[40%] left-0 text-white">
                  <h2 className="text-[48px] font-bold leading-[56px]">
                    {movie.title}
                  </h2>
                  <div className="w-[50%]">
                    <p className="text-lg my-3 text-[20px] w-full">
                      {movie.overview}
                    </p>
                  </div>
                  <div className="flex gap-5 items-center">
                    <Image
                      src={assets.icon.IMDB}
                      alt="imdb"
                      width={50}
                      height={50}
                      loading="lazy"
                    />
                    <div>
                      <p className="text-[16px] font-medium">
                        {movie.vote_average.toFixed(1)}/10
                      </p>
                    </div>
                  </div>
                  <button onClick={() => handleResultClick(movie.id)}>
                    <p className="border-2 p-2 rounded-lg mt-4 hover:shadow-lg shadow-cyan-500/50 text-[20px] hover:bg-cyan-900/60 hover:text-white">
                      Explore More
                    </p>
                  </button>
                </div>
              </SplideSlide>
            ))}
        </Splide>
      ) : (
        <div className="w-full h-[280px] mt-20">
          <Image
            src={assets.icon.SPINNER}
            alt="Loading..."
            width={200}
            height={200}
            className="mx-auto"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
