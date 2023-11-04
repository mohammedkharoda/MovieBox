export async function fetchRecommendedSeries(tvId: any) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        }
    };

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/tv/${tvId}/similar?language=en-US&page=1`,
            options
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
