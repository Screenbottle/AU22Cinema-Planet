
const ErrorPage = (props) => {

    const errorCode = props.errorCode;

    return (
        <div>
            <h6>Something went wrong, Error: {errorCode}</h6>
        </div>
    )
}

export default ErrorPage;