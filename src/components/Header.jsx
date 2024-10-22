import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { addUser, removeUser } from "../Utils/userSlice";
import useOnline from "../Utils/useOnline";
import logo from "../Assets/Images/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isOnline = useOnline();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const cartItems = useSelector((store) => store.cart.items);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      console.error("Sign out error:", error);
      navigate("/error");
    });
  };

  const NavLink = ({ to, children }) => (
    <li className="mx-2">
      <Link
        to={to}
        className="text-gray-700 hover:text-red-600 transition-colors duration-300"
      >
        {children}
      </Link>
    </li>
  );

  return (
    <header className="bg-white shadow-md font-quicksand">
      <div className="mx-12">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex-shrink-0">
            <img
              data-testid="logo"
              alt="logo"
              className="w-60 h-auto"
              src={logo}
            />
          </Link>

          <nav className="hidden md:block">
            <ul className="flex items-center space-x-4">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              <NavLink to="/instamart">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 animate-pulse">
                  Instamart
                </span>
              </NavLink>
              <NavLink to="/cart" data-testid="cartItems">
                Cart - {cartItems.length}
              </NavLink>
            </ul>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <span
              data-testid="online-status"
              className={`h-3 w-3 rounded-full ${
                isOnline ? "bg-green-500" : "bg-red-500"
              }`}
              title={isOnline ? "Online" : "Offline"}
            ></span>
            {user ? (
              <button
                onClick={handleSignOut}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/Login"
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Sign In
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="toggle menu"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <ul className="pt-2 pb-4 space-y-2">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              <NavLink to="/instamart">Instamart</NavLink>
              <NavLink to="/cart" data-testid="cartItems">
                Cart - {cartItems.length}
              </NavLink>
              <li>
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors duration-300"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/Login"
                    className="block w-full text-left px-3 py-2 text-base font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors duration-300"
                  >
                    Sign In
                  </Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
