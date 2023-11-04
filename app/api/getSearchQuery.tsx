// getSearchQuery.tsx
export async function getSearchQuery(query: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
        next: { revalidate: 3600 }, cache: "force-cache" 
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.results;
    } else {
      console.error("Failed to fetch data");
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
