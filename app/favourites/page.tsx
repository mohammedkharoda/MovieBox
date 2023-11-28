"use client";
import { assets } from "@/public/assets";
import { useLikedMoviesStore } from "@/store/store";
import { auth, useAuth } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, {useEffect, useState} from "react";


export const revalidation = 0;
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const FavouriteMovies = () => {
  const likedMoviesStore = useLikedMoviesStore() as unknown as any;
  const likedMovies = likedMoviesStore.likedMovies;
  const router = useRouter();
  const handleImageClick = (id: number, isMovie: boolean) => {
    if (!isMovie) {
      router.push(`/movie/${id}`);
    } else {
      router.push(`/tv/${id}`);
    }
  };
  const { userId } = useAuth();
  const [isClient,setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, []);
  return (
    <>
      <Navbar />
      {likedMoviesStore.likedMovies.length <= 0 ? (
        <div className="mt-[10rem] mx-auto">
          <p className="text-center font-sans text-[30px]">
            No Favourite Movies Yet!
          </p>
          <Image
            src="https://media.giphy.com/media/dBsUACbhvDROt9pbFO/giphy.gif"
            alt="tom-gif"
            width={500}
            height={500}
            className="mx-auto mt-10 rounded-lg drop-shadow-lg"
          />
        </div>
      ) : (
        <>
          <div className="text-3xl underline font-bold mt-[10rem] mb-[5rem] text-center">
            Favourite Movies
          </div>
          <div className="flex gap-[10px]">
            {likedMovies.map((movie: any) => (
              <div
                key={movie?.id}
                className=" rounded-xl flex flex-col items-center gap-4 w-fit"
              >
                <div className="w-[585px] h-[521px] relative rounded-xl">
                  <Image
                    src={`https://image.tmdb.org/t/p/original${
                      movie?.poster_path ?? assets.image.DUMMY
                    }`}
                    fill
                    objectFit="contain"
                    loading="lazy"
                    alt={movie?.title}
                    className="drop-shadow-2xl rounded-lg hover:scale-105 transition ease-in-out duration-200 hover:cursor-pointer"
                    onClick={() =>
                      handleImageClick(
                        movie?.id,
                        !!movie?.seasons || movie?.type === "Miniseries"
                      )
                    }
                  />
                </div>
                <p className="font-bold text-[25px] font-sans">
                  {movie?.title ? movie?.title : movie?.name}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default FavouriteMovies;
