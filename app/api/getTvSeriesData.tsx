export const getTvSeriesData = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/tv/week?language=en-IN&api_key=${process.env.NEXT_PUBLIC_KEY}`
    );
    if (response.ok) {
      const data = await response.json();
      return data.results;
    } else {
      console.error("Failed to fetch movie data");
    }
  } catch (e) {
    console.error("Error:", e);
  }
};
