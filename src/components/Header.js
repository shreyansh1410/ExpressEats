import { useState } from "react";
import logo from "../Assets/Images/logo.png";
import { Link } from "react-router-dom";

// const IsLoggedIn = () => {
//     return true;
// }

const Title = () => {
    return (
        <h1 id="title" key="h2">
            <a className="logonameandimage" href="/">
                <img
                    alt="logo"
                    className="logo"
                    src={logo}>
                </img>
                ExpressEats
            </a>
        </h1>
    )
};

const Header = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className='header'>
            <Title />
            <div className='nav-items'>
                <ul className="sidelist">
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/about"}>About</Link></li>
                    <li><Link to={"/contact"}>Contact</Link></li>
                    <li><Link to={"/cart"}>Cart</Link></li>
                    <li><Link to={"/instamart"}>Instamart</Link></li>
                </ul>
            </div>
            { isLoggedIn ? <button onClick={() => setIsLoggedIn(false)}>Log Out</button> : <button onClick={() => setIsLoggedIn(true)}>Log In</button>}
        </div>
    );
};

export default Header;