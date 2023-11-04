export async function fetchRecommendedMovies(movieId: any) {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
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

        if (response.ok) {
            const responseData = await response.json();
            return responseData.results;
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
