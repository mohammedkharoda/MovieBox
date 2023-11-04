const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const baseUrl = 'https://api.themoviedb.org/3';

// Function to fetch movie details
export const fetchMovieDetails = async (movieId: any) => {
    const url = `${baseUrl}/movie/${movieId}?language=en-US`;

    try {
        const response = await fetch(url, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            next: { revalidate: 3600 },
            cache: "force-cache"
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

// Function to fetch movie videos
export const fetchMovieVideos = async (movieId: any) => {
    const url = `${baseUrl}/movie/${movieId}/videos?language=en-US`;

    try {
        const response = await fetch(url, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            next: { revalidate: 3600 },
            cache: "force-cache"
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

// Function to fetch movie credits (cast and crew)
export const fetchMovieCredits = async (movieId: any) => {
    const url = `${baseUrl}/movie/${movieId}/credits?language=en-US`;

    try {
        const response = await fetch(url, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            next: { revalidate: 3600 },
            cache: "force-cache"
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
