import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import "./MovieDetails.css";

const MovieDetails = () => {
  const apiKey = "a1d7615b946e5e8a79a71f257fa86e96";
  const baseUrl = "https://api.themoviedb.org/3/movie/";

  const { movie_id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [currentMovieDetail, setMovie] = useState(null);
  const [trailers, setTrailers] = useState([]);

  const [comment, setComment] = useState("");

  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newComment = {
      comment: comment,
      rating: rating,
    };
    db.collection(movie_id).add(newComment)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  
    setComments([...comments, newComment]);
    setComment("");
    setRating(0);
  };

  

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starClass =
        i <= rating ? "fa fa-star checked" : "fa fa-star unchecked";
      stars.push(
        <span
          key={i}
          className={starClass}
          onClick={() => handleRatingChange(i)}
        />
      );
    }
    return stars;
  };

  const renderComments = () => {
    return comments.map((c, index) => (
      <div key={index} className="comment">
        <p>Rating: {c.rating} stars</p>
        <p>Comment: {c.comment}</p>
      </div>
    ));
  };

  useEffect(() => {
    getData();
    getComments();
    window.scrollTo(0, 0);
  }, []);

  const getData = () => {
    setIsLoading(true);
    Promise.all([
      fetch(`${baseUrl}${movie_id}?api_key=${apiKey}&language=en-US`),
      fetch(`${baseUrl}${movie_id}/videos?api_key=${apiKey}&language=en-US`),
    ])
      .then(([movieRes, videosRes]) =>
        Promise.all([movieRes.json(), videosRes.json()])
      )
      .then(([movieData, videosData]) => {
        setMovie(movieData);
        setTrailers(videosData.results);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const getComments = async () => {
    const commentList = [];

    const querySnapshot = await getDocs(collection(db, movie_id));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      commentList.push()
    });

    setComments(commentList);
  }

  const createTrailers = () => {
    const trailerLinks = [];

    trailers.forEach((video) => {
      if (video.site === "YouTube" && video.type === "Trailer") {
        const key = video.key;
        const link = `https://www.youtube.com/embed/${key}`;
        trailerLinks.push(link);
      }
    });

    if (trailerLinks.length === 0) {
      return <img src="placeholder image" alt="No trailers found"></img>;
    } else {
      const videoArray = [];

      trailerLinks.forEach((link) => {
        const embeddedVideo = (
          <div>
            <iframe
              width="560"
              height="315"
              src={link}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
              allowFullScreen
            ></iframe>
          </div>
        );

        videoArray.push(embeddedVideo);
      });

      return videoArray;
    }
  };

  const trailerElements = createTrailers();

  return (
    <div className="wrapper">
      <div className="container">
        <img
          className="recMoviesContainer"
          src={`https://image.tmdb.org/t/p/original${
            currentMovieDetail ? currentMovieDetail.backdrop_path : ""
          }`}
        />
      </div>
      <div className="tittleContainer">
        <div className="movieInfo">
          <div className="detailsContainer"></div>
          <div className="imageContainer">
            <img
              className="postr"
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetail ? currentMovieDetail.poster_path : ""
              }`}
            />
          </div>
        </div>
        <div className="info_detailRight">
          <div className="info_detailRightTop">
            <div className="info_name">
              {currentMovieDetail ? currentMovieDetail.original_title : ""}
            </div>
            <div className="info_tagline">
              {currentMovieDetail ? currentMovieDetail.tagline : ""}
            </div>
            <div className="info_rating">
              {currentMovieDetail ? currentMovieDetail.vote_average : ""}{" "}
              <i class="fas fa-star" />
              <span className="info_voteCount">
                {currentMovieDetail
                  ? "(" + currentMovieDetail.vote_count + ") votes"
                  : ""}
              </span>
            </div>
            <div className="info_runtime">
              {currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}
            </div>
            <div className="info_releaseDate">
              {currentMovieDetail
                ? "Release date: " + currentMovieDetail.release_date
                : ""}
            </div>
            <div className="info_genres">
              {currentMovieDetail && currentMovieDetail.genres
                ? currentMovieDetail.genres.map((genre) => (
                    <>
                      <span className="info_genre" id={genre.id}>
                        {genre.name}
                      </span>
                    </>
                  ))
                : ""}
            </div>

            <div className="summaryContainer">
              <div className="summaryText">Summary</div>
              <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
              <div className="trailerContainer">
                <h2>Trailers</h2>
                <div className="videoContainer">{trailerElements}</div>
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <label>
                  Comment:
                  <textarea value={comment} onChange={handleCommentChange} />
                </label>
                <label>
                  Rating:
                  <div className="ratings">{renderStars()}</div>
                </label>
                <button type="submit" className="comment-button">
                  Submit
                </button>
              </form>
              <div className="comments">{renderComments()}</div>
            </div>
          </div>
          <div className="logo_heading">Production companies</div>
          <div className="logo_production">
            {currentMovieDetail &&
              currentMovieDetail.production_companies &&
              currentMovieDetail.production_companies.map((company) => (
                <>
                  {company.logo_path && (
                    <span className="logoContainer">
                      <img
                        className="logo"
                        src={
                          "https://image.tmdb.org/t/p/original" +
                          company.logo_path
                        }
                      />
                      <span>{company.name}</span>
                    </span>
                  )}
                </>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieDetails;
