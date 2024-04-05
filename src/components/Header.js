import { useState, useContext } from "react";
import logo from "../Assets/Images/logo.png";
import { Link } from "react-router-dom";
import UserContext from "../Utils/userContext";
import useOnline from "../Utils/useOnline";
import { useSelector } from "react-redux";
// const IsLoggedIn = () => {
//     return true;
// }

const Title = () => {
  return (
    <h1 id="title" key="h2">
      <a className="logonameandimage" href="/">
        <img
          data-testid="logo"
          alt="logo"
          className="logo w-60 mx-5 my-5 "
          src={logo}
        ></img>
      </a>
    </h1>
  );
};

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isOnline = useOnline();

  const { user } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);
  // console.log(cartItems.length);
  // for (var i = 0; i < cartItems.length; i++) {
  //     console.log(cartItems[i].name);
  // }

  return (
    <div className="flex justify-between align-middle font-medium shadow-md font-quicksand items-center">
      <Title />
      <div className="nav-items">
        <ul className="sidelist flex my-8">
          <li className="mx-2">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="mx-2">
            <Link to={"/about"}>About</Link>
          </li>
          <li className="mx-2">
            <Link to={"/contact"}>Contact</Link>
          </li>
          <li className="mx-2">
            <Link to={"/cart"} data-testid="cartItems">
              Cart - {cartItems.length}
            </Link>
          </li>
          <li className="mx-2">
            <Link to={"/instamart"}>Instamart</Link>
          </li>
          <li data-testid="online-status">{isOnline ? "🟢" : "Offline🔴"}</li>
        </ul>
      </div>

      {/* <span className="py-8">Hello, {user.name}!</span> */}
      {isLoggedIn ? (
        <button
          className=" bg-red-300 text-white mx-11 h-9 my-8 rounded-lg w-20 hover:shadow-xl"
          onClick={() => setIsLoggedIn(false)}
        >
          Log Out
        </button>
      ) : (
        <button
          className="bg-red-500 text-white mx-11 h-9 my-8 rounded-lg w-20 hover:shadow-xl"
          onClick={() => setIsLoggedIn(true)}
        >
          Log In
        </button>
      )}
    </div>
  );
};

export default Header;
