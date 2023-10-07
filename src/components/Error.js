import { useRouteError } from "react-router-dom";
import errorImage from "../Assets/Images/errorImage.jpg";
import { Link } from "react-router-dom";


const Error = () => {
    const error = useRouteError();
    {console.log(error)}
    return(
        <div>
            <h1>Oops! Error {error.status}, Page {error.statusText}</h1>
            <h2>Go back to <Link to={"/"}>Home</Link></h2>
            <img src={errorImage} className="error-image"></img>
        </div>
    )
}

export default Error;