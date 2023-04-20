import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import MovieNotFound from "./MovieNotFound";


const MovieDetails = () => {
    const apiKey = 'put api key here';
    const baseUrl = 'https://api.themoviedb.org/3/movie/';

    const params = useParams();
    
    const [content, setContent] = useState(null);

    const [details, setDetails] = useState(null);
    const [trailers, setTrailers] = useState(null);
    const [movieId, setMovieId] = useState(null);

    const [detailsCallDone, setDetailsCallDone] = useState(false);
    const [trailerCallDone, setTrailerCallDone] = useState(false);

    useEffect(() => {
        if ('movie_id' in params) {
            setMovieId(params.movie_id)
            getMovieDetails(params.movie_id);
            getMovieTrailers(params.movie_id);
        }
    }, [])

    useEffect(() => {
        if (detailsCallDone && trailerCallDone) {
            
        }
    }, [detailsCallDone, trailerCallDone])

    const getMovieDetails = async (movie_id) => {
        const url = `${baseUrl}${movie_id}?api_key=${apiKey}&language=en-US`

        const response = await fetch(url);
        const data = response.json();

        if (data.status_code === 34) {
            putErrorPage();
        }
        else {
            setDetails(data);
            setDetailsCallDone(true);
        }
    }

    const getMovieTrailers = async (movie_id) => {
        const url = `${baseUrl}${movie_id}/videos?api_key=${apiKey}&language=en-US`

        const response = await fetch(url);
        const data = response.json();


        if (data.status_code === 34) {
            putErrorPage();
        }
        else {
            setTrailers(data.results);
            setTrailerCallDone(true);
        }
    }

    const getSimiliarMovies = async () => {

    }

    const createDetails = () => {

        return (
            <div>
                Details go here
            </div>
        )
    }



    const createTrailers = () => {
        const trailerLinks = [];


        trailers.results.forEach(video => {
            if (video.site === "YouTube" && video.type === "Trailer") {
                const key = video.key
          
                const link = `https://www.youtube.com/embed/${key}`
                trailerLinks.push(link)
              }
        });

        if (trailerLinks.length == 0) {
            // if a movie does not have any trailers on youtube, put a placeholder image or something
            return (
                <img src="placeholder image" alt="No trailers found"></img>
            )
        }
        else {
            const videoArray = [];

            trailerLinks.forEach(link => {
                const embeddedVideo = (
                    <div>
                        <iframe width="560" height="315" src={link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowFullScreen></iframe>
                    </div>
                );

                videoArray.push(embeddedVideo);
            })

            return(videoArray);

        }
    }

    const putErrorPage = () => {
        const errorPage = (
            <MovieNotFound />
        )

        setContent(errorPage);
    }

    const addToCart = () => {

    }


    return (
        <div>
            {content}
        </div>
    )


}

export default MovieDetails;