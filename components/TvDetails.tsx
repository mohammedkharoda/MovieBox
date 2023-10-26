"use client";
import { assets } from "@/public/assets";
import { useTvParamsStore } from "@/store/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsPen } from "react-icons/bs";
import { HiMiniLanguage } from "react-icons/hi2";
import { LiaImdb } from "react-icons/lia";
import { RiMovie2Line } from "react-icons/ri";
const TvDetails = () => {
  const [seriesData, setseriesData] = useState<any>(null);
  const params = useTvParamsStore((state) => state.params);
  console.log(params, "inisde component");

  useEffect(() => {
    if (params) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY} `,
        },
      };

      fetch(`https://api.themoviedb.org/3/tv/${params}?language=en-US`, options)
        .then((response) => response.json())
        .then((data) => setseriesData(data))
        .catch((err) => console.error(err));
    }
  }, [params]);

  if (!seriesData) {
    return <div>Loading...</div>;
  }

  function convertToHoursAndMinutes(minutes: number) {
    if (minutes === null || minutes === undefined) {
      return "N/A";
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${remainingMinutes} min`;
    } else if (remainingMinutes === 0) {
      return `${hours} hr`;
    } else {
      return `${hours} hr ${remainingMinutes} min`;
    }
  }

  return (
    <div className="mt-[10rem] grid  grid-rows-1 gap-4 justify-items-center">
      <div className="w-[585px] h-[521px] relative rounded-xl">
        <Image
          fill
          objectFit="contain"
          loading="lazy"
          src={
            seriesData?.poster_path
              ? `https://image.tmdb.org/t/p/original${seriesData?.poster_path}`
              : assets.image.DUMMY
          }
          alt={seriesData?.title}
          className="drop-shadow-2xl "
        />
      </div>
      <div className="col-start-1 row-start-2 ">
        <button className="bg-blue-900 text-white shadow-lg  transition ease-in-out delay-150 hover:bg-black px-10 py-3 rounded-xl hover:scale-110 flex gap-3">
          <RiMovie2Line size={26} />
          Watch Trailer
        </button>
      </div>
      <div className="col-start-2 row-start-1 flex flex-col gap-4">
        <div className="text-4xl font-bold">{seriesData?.name}</div>
        <div className="flex gap-4">
          {seriesData?.genres?.map((genre: any, index: number) => (
            <div key={index}>
              <p className="text-[15px] text-gray-800/80 uppercase">
                {genre?.name}
              </p>
            </div>
          ))}
        </div>
        <div className="text-[20px] text-gray-800/80">
          {seriesData?.tagline}
        </div>
        <div className="flex flex-col gap-2">
          <p className="uppercase text-[20px] text-[#000] font-semibold">
            Storyline
          </p>
          <div className="text-[18px]">{seriesData?.overview}</div>
        </div>
        <div className="flex flex-row w-fit gap-10  ">
          <div className="flex flex-col w-fit gap-2">
            <div className="text-[20px] font-semibold mt-3">
              Production Company
            </div>
            {seriesData?.production_companies?.map(
              (company: any, index: number) => (
                <p
                  className="font-bold text-[25px] uppercase underline underline-offset-8"
                  key={index}
                >
                  {company?.name}
                </p>
              )
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 ">
              <HiMiniLanguage size={26} />
              <p className="font-semibold text-[20px]">Languages</p>
            </div>
            {seriesData?.spoken_languages?.map(
              (language: any, index: number) => (
                <div key={index}>
                  <p className="font-bold text-[28px]">{language?.name}</p>
                </div>
              )
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <BsPen size={26} />
              <div className="font-semibold text-[20px]">Written By</div>
            </div>
            <div>
              {seriesData?.created_by.length > 0 ? (
                seriesData?.created_by?.map((creator: any, index: number) => (
                  <div key={index}>
                    <p className="font-bold text-[20px] text-[#000] capitalize">
                      {creator?.name}
                    </p>
                  </div>
                ))
              ) : (
                <p className="capitalize font-sans text-[20px] font-bold text-[#000]">
                  anonymous
                </p>
              )}
            </div>
          </div>
          <div>
            <div className="font-semibold text-[20px]">Streaming On</div>
            <div className="w-[150px] h-[150px] ">
              <div className="flex gap-4 mt-2 flex-wrap">
                {seriesData?.networks
                  ?.slice(0, 3)
                  .map((network: any, index: number) => (
                    <div key={index}>
                      <Image
                        src={`https://image.tmdb.org/t/p/original${network?.logo_path}`}
                        alt={network.name}
                        height={300}
                        width={300}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="gap-2 flex flex-col">
            <div className="flex items-center gap-2">
              <LiaImdb size={26} />
              <div className="text-[20px] font-semibold">Rating</div>
            </div>
            <div className="text-[20px] font-bold">
              {seriesData?.vote_average?.toFixed(1)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvDetails;
