"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/public/assets";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useRouter } from "next/navigation";
import { getTopPeopleData } from "@/app/api/getTopPeopleData";
import Loading from "./Loading";
interface Movie {
  id: number;
  profile_path: string | null;
  name: string;

  // Add other properties if needed
}
const TopPeoples = () => {
  const [person, setPerson] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const splideOptions = {
    type: "loop",
    autoplay: true,
    perPage: 3,
    perMove: 2,
    pagination: false, // You can enable pagination if needed
    navigation: true,
    arrows: false,
    gap: "5%",
    direction: "horizontal",
  };

  function formatDate(inputDate: string) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(inputDate).toLocaleDateString(undefined, options);
  }

  useEffect(() => {
    try {
      getTopPeopleData().then((data) => {
        setPerson(data);
        setIsLoading(false);
      });
    } catch (e) {}
  }, []);

  const router = useRouter();

  return (
    <div className="flex flex-col px-10 mt-[70px]">
      <div className="font-sans text-[36px] font-black">Top People</div>
      {/*@ts-ignore*/}
      {isLoading ? (
        <div className="w-full h-[280px]">
          <Loading/>
        </div>
      ) : (
        // @ts-ignore
        <Splide options={splideOptions}>
          {person.map((actor) => (
            <SplideSlide key={actor.id}>
              <div className="flex flex-col ">
                <div className="h-[570px] w-full relative mt-5">
                  <Image
                    src={
                      actor?.profile_path
                        ? `https://image.tmdb.org/t/p/original/${actor.profile_path}`
                        : assets.image.DUMMY
                    }
                    alt={actor.name}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="rounded-xl cursor-pointer hover:scale-105 transition ease-in-out duration-200"
                    loading="lazy"
                    onClick={() => {
                      router.push(`/actors/${actor.id}`);
                    }}
                  />
                </div>
                <div className="mt-5 flex flex-col gap-2">
                  <p className="text-xl font-bold break-words w-[250px] capitalize">
                    {actor.name}
                  </p>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      )}
    </div>
  );
};

export default TopPeoples;
