import React, { useState, useRef } from "react";
import Header from "./Header";
import { validateEmailPass } from "../Utils/validate";
import { BACKGROUND_IMG_URL, USER_AVATAR } from "../Utils/constants";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Redirect } from "react-router-dom";

const Login = () => {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [redirect, setRedirect] = useState(false); 
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  // console.log(email);
  // console.log(password);

  const toggleState = () => {
    const a = isSignedIn;
    setIsSignedIn(!a);
  };

  const handleButtonClick = () => {
    const message = validateEmailPass(
      email.current.value,
      password.current.value
    );
    //returns email not valid, password not valid or NULL (if everything is correct)
    setErrorMessage(message);
    //if error present then dont return anything
    if (message) return;

    if (!isSignedIn) {
      //sign up logic
      const auth = getAuth();
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name?.current?.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              // Profile updated!
              setRedirect(true);
              const { uid, email, displayName, photoURL } = auth?.currentUser;   //fetch user from the updated value (auth.currentUser), not user written above because that is the older value
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      //sign in logic
      const auth = getAuth();
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setRedirect(true);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  };

  if (redirect) {
    return <Redirect to="/tempbody" />;
  }

  return (
    <div>
      <div className="w-full h-full absolute brightness-50">
        <img
          src={BACKGROUND_IMG_URL}
          alt="background"
          className="max-h-screen w-screen object-cover"
        ></img>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="absolute text-white h-[580px] w-11/12 md:w-3/12 mx-auto left-0 right-0 my-24 p-8 bg-black bg-opacity-80"
      >
        <h1 className="text-4xl font-semibold py-8">
          {isSignedIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignedIn && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-2 w-full h-14 rounded-lg bg-gray-800"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-2 w-full h-14 rounded-lg bg-gray-800"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-2 w-full h-14 rounded-lg bg-gray-800"
        />
        <p className="cursor-pointer flex justify-center text-red-600 text-xs">
          {errorMessage}
        </p>
        <button
          className="bg-red-600 rounded-lg px-10 py-2 my-4 w-full font-semibold saturate-150"
          onClick={handleButtonClick}
        >
          {" "}
          {isSignedIn ? "Sign In" : "Sign Up"}
        </button>

        <p onClick={toggleState} className="cursor-pointer font-bold mb-8 my-4">
          {isSignedIn
            ? "Don't have an account, Sign Up Now!"
            : "Already registered, Sign In now!"}
        </p>

        <p className="cursor-pointer mb-8 my-4 flex justify-center">
          &copy; Shreyansh Shukla
        </p>
      </form>
    </div>
  );
};

export default Login;
