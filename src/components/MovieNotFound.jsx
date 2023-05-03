import { Link } from "react-router-dom";


const MovieNotFound = () => {

    return(
        <div>
            Error 404: Movie Not Found
            <br />
            <Link to='/movie/76600'>
                Avatar
            </Link>
        </div>
    )
}

export default MovieNotFound;