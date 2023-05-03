
const ErrorPage = (props) => {

    const errorCode = props.errorCode;
    console.log(errorCode);

    return (
        <div>
            <h6>Something went wrong, Error: </h6>
        </div>
    )
}

export default ErrorPage;