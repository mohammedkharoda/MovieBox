// ==> For Trailer 
export async function fetchTvDetails(params: string) {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
    };

    const response = await fetch(
        `https://api.themoviedb.org/3/tv/${params}?language=en-US`,
        options
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch TV show details: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
}

export async function fetchTrailerVideo(params: string) {
    const options = {
        method: "GET",
        headers: {
            accept: "application json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
    };

    const response = await fetch(
        `https://api.themoviedb.org/3/tv/${params}/videos?language=en-US`,
        options
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch trailer video: ${response.statusText}`);
    }

    const data = await response.json();
    const trailerVideo = data.results.find((video: any) => video.type === "Trailer");

    return trailerVideo;
}