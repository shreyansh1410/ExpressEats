import { Link } from "react-router-dom";

const About = () => {
    return(
        <>
            <h1>About Us</h1>
            <p>This is chapter 07 of Namaste React, finding the path</p>
            <Link to={"/profile"}><p>Click here to go to my profile</p></Link>
        </>
    )
}

export default About;