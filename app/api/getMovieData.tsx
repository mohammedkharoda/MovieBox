export default async function getMovieData() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_KEY}&language=en-US&page=1`,
    { next: { revalidate: 3600 }, cache: "force-cache" }
  );
  const data = await res.json();
  return data.results;
}
