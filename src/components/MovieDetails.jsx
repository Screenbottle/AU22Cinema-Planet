import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovieNotFound from "./MovieNotFound";
import './MovieDetails.css'
import ErrorPage from "./ErrorPage";


const MovieDetails = () => {
    const apiKey = 'place key here';
    const baseUrl = 'https://api.themoviedb.org/3/movie/';

    const params = useParams();
    
    const [content, setContent] = useState(null);
    const [movieId, setMovieId] = useState(null);

    const [details, setDetails] = useState(null);
    const [trailers, setTrailers] = useState(null);
    const [recMovies, setRecMovies] = useState(null);
    const [recMoviePages, setRecMoviePages] = useState(null);
    const [recPage, setRecPage] = useState(0);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        
        if ('movie_id' in params) {
            fetchData(params.movie_id);
            setMovieId(params.movie_id)
        }

        
    }, [])

    const fetchData = async (movie_id) => {
        // handles the 3 api calls, makes sure that they are all completed before 
        const detailsUrl = `${baseUrl}${movie_id}?api_key=${apiKey}&language=en-US`;
        const trailerUrl = `${baseUrl}${movie_id}/videos?api_key=${apiKey}&language=en-US`;
        const recommendationsUrl = `${baseUrl}${movie_id}/recommendations?api_key=${apiKey}&language=en-US`;

        try {  
            const [detailsResult, trailerResult, recResponse ] = await Promise.all([
                fetch(detailsUrl).then(res => res.json()),
                fetch(trailerUrl).then(res => res.json()),
                fetch(recommendationsUrl).then(res => res.json())
            ]);

            setDetails(detailsResult);
            setTrailers(trailerResult.results);
            setRecMovies(recResponse.results);
            createRecMoviePages();
            setIsLoading(false);
            
        } catch (error) {
            setContent(
                <ErrorPage errorCode={error}/>
            )
        }
    }

    const createRecMoviePages = () => {
        const tempRecMoviePages = [];
        const size = 5;

        for (let i = 0; i < recMovies.length; i += size) {
            const chunk = recMovies.slice(i, i + size);
            tempRecMoviePages.push(chunk);
        }

        setRecMoviePages(tempRecMoviePages);

    }

    useEffect(() => {
        if (!isLoading) {
            setContent(createContent());
        }
    }, [isLoading]);

    const createContent = () => {

        const title = details.original_title;
        const overview = details.overview;
        const genres = [];
        details.genres.forEach(genre => {
            genres.push(genre.name + ' ');
        });
        const language = details.original_language;
        const poster = createImageUrl('w780', details.poster_path);

        const companyLogoElements = [];
        details.production_companies.forEach(company => {
            const logoUrl = createImageUrl('w154', company.logo_path);

            const logoElement = (
                <img className="logo" src={logoUrl} alt=""/>
            )

            companyLogoElements.push(logoElement);
        });



        const releaseDate = details.release_date;
        const runtime = details.runtime;
        const voteAverage = details.vote_average;
        const voteCount = details.vote_count;
        
        const trailerElements = createTrailers();
        const recElement = createRecElement();

        return (
            <div className="wrapper">
                <header> </header>
                <div>
                    <div className="container">
                        <header className="titleContainer">
                            <h1>{title}</h1>
                            <div className="movieInfo">
                                <h4>Release Date: {releaseDate}</h4>
                                <h4>Runtime: {runtime}</h4>
                                <h4>Genres: {genres}</h4>
                            </div>
                            
                        </header>
                        <div className="detailsContainer">
                            
                        
                            <div className="imageContainer">
                                <img className="poster" src={poster} alt={title + 'Poster'}/>
                                <div className="logoContainer">
                                    {companyLogoElements}
                                </div>
                            </div>

                            <div className="summaryContainer">
                                <h3>Summary:</h3>
                                <p>
                                    {overview}
                                </p>
                                <div className="trailerContainer">
                                    {trailerElements}
                                </div>

                            </div>

                        </div>

                        <br />
                        <div className="recMoviesContainer">
                            {recElement}
                        </div>
                    </div>

                </div>


                <footer> </footer>
            </div>
        )
    }

    const createImageUrl = (size, key) => {
        const url = `http://image.tmdb.org/t/p/${size}${key}`
        return url;
    }

    const createRecElement = () => {

        const recPageElements = [];

        
        recMoviePages.forEach(page => {
            const movieElements = [];

            page.forEach(movie => {
                const posterKey = movie.poster_path;
                const poster = createImageUrl('w92', posterKey);
                const title = movie.title;
                const voteAverage = movie.vote_average;

                const element = (
                    <div className="recMovieContainer">
                        <div className="recPosterContainer">
                            <img className="recPoster" src={poster} alt={title + ' poster'}/>
                        </div>
                        <div className="recTextContainer">
                            <h5>{title}</h5>
                            <h6>{voteAverage}</h6>
                        </div>
                    </div>
                )

                if (posterKey != null) {
                    movieElements.push(element);
                }
            });

            const pageElement = (
                <div className="recPage">
                    {movieElements}
                </div>
            );

            recPageElements.push(pageElement);

            
        });

        const recMoviesElement = (
            <div className="recMoviesElement">
                <button onClick={prevPage}>Left</button>
                <div className="recPages">
                    {recPageElements}
                </div>
                <button onClick={nextPage}>Right</button>
            </div>
        );

        const nextPage = () => {
            if (recPage < recMoviePages.length) {
                setRecPage(recPage + 1);
            }
            else {
                setRecPage(0);
            }

        }

        const prevPage = () => {
            if (recPage > 0) {
                setRecPage(recPage - 1);
            }
        }

        return recMoviesElement;
    }

    const createTrailers = () => {
        const trailerLinks = [];


        trailers.forEach(video => {
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