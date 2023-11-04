export default async function getNewArrivalData() {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.NEXT_PUBLIC_KEY}&language=en-US&page=1`,
    { next: { revalidate: 3600 }, cache: "force-cache" }
  );
  const data = await res.json();
  return data.results;
}
