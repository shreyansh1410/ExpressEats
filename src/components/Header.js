import { useState } from "react";

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
                    src="https://expresseats.online/assets/images/website-logo-icon/225804142023210331.png">
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
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                    <li>Cart</li>
                </ul>
            </div>
            { isLoggedIn ? <button onClick={() => setIsLoggedIn(false)}>Log Out</button> : <button onClick={() => setIsLoggedIn(true)}>Log In</button>}
        </div>
    );
};

export default Header;