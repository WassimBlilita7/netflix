import { fetchFromTMDB } from "../services/tmdbService.js";

export async function getTrandingMovie(req, res) {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
        res.json({success: true, content: randomMovie});
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to fetch data from TMDB");
    }
    }