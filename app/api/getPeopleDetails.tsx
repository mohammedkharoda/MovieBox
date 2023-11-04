export async function fetchActorDetails(params: any) {
    const options = {

    };

    const detailsResponse = await fetch(
        `https://api.themoviedb.org/3/person/${params}?language=en-US`,
        {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            },
            next: { revalidate: 3600 },
            cache: "force-cache"
        }
    );

    const creditsResponse = await fetch(
        `https://api.themoviedb.org/3/person/${params}/combined_credits?language=en-US`,
        {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            },
            next: { revalidate: 3600 },
            cache: "force-cache"
        }
    );

    if (!detailsResponse.ok || !creditsResponse.ok) {
        throw new Error('API request failed');
    }

    const actorDetails = await detailsResponse.json();
    const creditsData = await creditsResponse.json();
    const credits = creditsData.cast;

    return { actorDetails, credits };
}
