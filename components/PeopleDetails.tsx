import { assets } from "@/public/assets";
import { useMovieParamsStore, usePeopleKeyStore } from "@/store/store";
import Image from "next/image";
import { useEffect, useState } from "react";

const PeopleDetails = () => {
  const [actorDetails, setActorDetails] = useState<any>(null);
  const params = usePeopleKeyStore((state) => state.params);

  // Function to extract and format movie titles
  const extractMovieTitles = (biography: string) => {
    const movieRegex = /(\b\w+:\s\([\d–]+\))/g;
    const matches = biography.match(movieRegex);
    if (matches) {
      return matches.map((match) => match.trim());
    }
    return [];
  };

  // ==> For Details
  useEffect(() => {
    if (params) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      };

      fetch(
        `https://api.themoviedb.org/3/person/${params}?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((data) => setActorDetails(data))
        .catch((err) => console.error(err));
    }
  }, [params]);

  console.log(params, "from actor");

  if (!actorDetails || !actorDetails.profile_path) {
    return (
      <div className="w-full h-[280px] mt-20">
        <Image
          src={assets.icon.SPINNER}
          alt="Loading..."
          width={200}
          height={200}
          className="mx-auto"
          loading="lazy"
        />
        <p className="text-center font-sans text-[18px] font-semibold">
          Get your favorite Actor in a sec ...
        </p>
      </div>
    );
  }

  const biography = actorDetails.biography;
  const movieTitles = extractMovieTitles(biography);

  return (
    <div className="mt-[10rem] grid  grid-rows-1 gap-4 justify-items-center">
      <div className="w-[585px] h-[521px] relative rounded-xl">
        <Image
          fill
          objectFit="contain"
          loading="lazy"
          src={`https://image.tmdb.org/t/p/original${
            actorDetails.profile_path ?? assets.image.DUMMY
          }`}
          alt={actorDetails.name}
          className="drop-shadow-2xl"
        />
      </div>
      <div className="col-start-2 row-start-1 flex flex-col gap-4">
        <div className="text-4xl font-bold">{actorDetails.title}</div>
        <div className="flex gap-4">
          <div>
            <p className="text-[28px] font-semibold text-gray-800/80 uppercase">
              {actorDetails?.name}
            </p>
          </div>
        </div>
        <div className="text-[20px] text-gray-800/80">
          <div>Birth Place :</div>
          <p className="font-semibold">{actorDetails?.place_of_birth}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="uppercase text-[20px] text-[#000] font-semibold">
            Storyline
          </p>
          <div className="text-[18px] break-word w-[80%]">{biography}</div>
        </div>
      </div>
    </div>
  );
};

export default PeopleDetails;
