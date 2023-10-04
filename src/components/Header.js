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
        </div>
    );
};

export default Header;