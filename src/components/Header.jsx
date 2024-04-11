import { useState, useContext, useEffect } from "react";
import logo from "../Assets/Images/logo.png";
import { Link } from "react-router-dom";
import UserContext from "../Utils/userContext";
import useOnline from "../Utils/useOnline";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { addUser, removeUser } from "../Utils/userSlice";
import Login from "./Login";

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
  )
}

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isOnline = useOnline();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  console.log(user + "from header.jsx");

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      })
  }

  useEffect(() => {
    //writing in useEffect coz we only have to do this only once
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user is logged in from header");
        // User is signed in
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        )
        navigate("/")
      } else {
        // User is signed out
        dispatch(removeUser())
        navigate("/")
      }
    })
    //Unsubscribe from store when component unmounts
    return () => unsubscribe()
  }, [navigate, dispatch])

  const cartItems = useSelector((store) => store.cart.items)
  // console.log(cartItems.length);
  // for (var i = 0; i < cartItems.length; i++) {
  //     console.log(cartItems[i].name);
  // }

  return (
    <div className="flex justify-between align-middle font-medium shadow-md font-quicksand items-center">
      <Title />
      
      <div className="nav-items">
        <ul className="sidelist flex my-8 items-center px-2">
          <li className="mx-2 hover:text-red-600">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="mx-2 hover:text-red-600">
            <Link to={"/about"}>About</Link>
          </li>
          <li className="mx-2 hover:text-red-600">
            <Link to={"/contact"}>Contact</Link>
          </li>
          <li className="mx-2 hover:text-red-600">
            <Link to={"/cart"} data-testid="cartItems">
              Cart - {cartItems.length}
            </Link>
          </li>
          <li className="mx-2">
            <Link to={"/instamart"} className="text-transparent bg-clip-texttext-transparent bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text animate-bounce">Instamart</Link>
          </li>
          <li className="mx-2" data-testid="online-status">{isOnline ? "🟢" : "Offline🔴"}</li>
          <li>{user && (
            <button
              onClick={handleSignOut}
              className="bg-red-200 py-2 px-4 h-12 my-2 rounded-lg mx-2"
            >
              Sign Out
            </button>
          )}
          {!user && (
            <button className="bg-red-200 py-2 px-4 h-12 my-2 rounded-lg mx-2">
              <Link to="/Login"> Sign In </Link>
            </button>
          )}</li>
        </ul>
        
      </div>
    </div>
  );
};

export default Header;
