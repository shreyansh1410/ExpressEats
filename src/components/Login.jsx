import React, { useState, useRef } from "react";
import { validateEmailPass } from "../Utils/validate";
import { BACKGROUND_IMG_URL, USER_AVATAR } from "../Utils/constants";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../Utils/userSlice'; // Import your user slice

const Login = () => {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleState = () => {
    setIsSignedIn(!isSignedIn);
  };

  const handleButtonClick = () => {
    const message = validateEmailPass(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    const auth = getAuth();
    if (!isSignedIn) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name?.current?.value,
            photoURL: USER_AVATAR,
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({ uid, email, displayName, photoURL }));
          }).catch((error) => {
            setErrorMessage(error.message);
          });
        }).catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(addUser({ uid: user.uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL }));
        }).catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-3xl font-semibold mb-4">
          {isSignedIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignedIn && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-2 w-full h-14 rounded-lg bg-gray-200"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-2 w-full h-14 rounded-lg bg-gray-200"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-2 w-full h-14 rounded-lg bg-gray-200"
        />
        {errorMessage && <p className="text-red-600 text-xs mb-2">{errorMessage}</p>}
        <button
          className="bg-blue-500 text-white rounded-lg px-6 py-2 my-2 w-full font-semibold"
          onClick={handleButtonClick}
        >
          {isSignedIn ? "Sign In" : "Sign Up"}
        </button>
        <p onClick={toggleState} className="cursor-pointer text-blue-500 text-center">
          {isSignedIn
            ? "Don't have an account? Sign Up Now!"
            : "Already have an account? Sign In now!"}
        </p>
      </div>
    </div>
  );
};

export default Login;
