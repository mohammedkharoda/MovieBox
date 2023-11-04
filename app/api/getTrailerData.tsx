export async function fetchMovieId() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_KEY}`,
      { next: { revalidate: 3600 }, cache: "force-cache" }
    );
    if (response.ok) {
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results.map((movie: any) => movie.id);
      }
    } else {
      console.error("Failed to fetch movie data");
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return [];
}

export async function fetchVideo(movieIds: any) {
  const videoPromises = movieIds.map(async (movieId: any) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_KEY}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          return {
            key: data.results[0].key,
            name: data.results[0].name,
          };
        }
      } else {
        console.error("Failed to fetch video data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    return null;
  });

  const videoData = await Promise.all(videoPromises);
  return videoData.filter((data) => data !== null);
}
