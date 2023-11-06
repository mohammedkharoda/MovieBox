// ==> For Trailer
export async function fetchTvDetails(params: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${params}?language=en-US`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      next: { revalidate: 3600 },
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch TV show details: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export async function fetchTrailerVideo(params: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${params}/videos?language=en-US`,
    {
      method: "GET",
      headers: {
        accept: "application json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      next: { revalidate: 3600 },
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch trailer video: ${response.statusText}`);
  }

  const data = await response.json();
  const trailerVideo = data.results.find(
    (video: any) => video.type === "Trailer"
  );

  return trailerVideo;
}

// Function to fetch movie credits (cast and crew)
export const fetchTvCredits = async (params: any) => {
  const url = `https://api.themoviedb.org/3/tv/${params}/credits?language=en-US`;

  try {
    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      next: { revalidate: 3600 },
      cache: "force-cache",
    });
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
