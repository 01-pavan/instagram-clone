import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doesUsernameExists } from "../services/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import * as ROUTES from "../constants/routes";
import Spinner from "../lib/loading.gif";

function SignUp() {
  const navigate = useNavigate();
  const db = getFirestore();
  const [emailAddress, setEmailAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const isInvalid =
    password === "" ||
    emailAddress === "" ||
    fullName === "" ||
    userName === "";

  const auth = getAuth();
  const handleSignUp = async (e) => {
    e.preventDefault();
    const userNameExists = await doesUsernameExists(userName);
    console.log("debug", userNameExists);

    if (!userNameExists) {
      try {
        setLoading(true);
        const createUser = await createUserWithEmailAndPassword(
          auth,
          emailAddress,
          password
        );

        await updateProfile(createUser.user, {
          displayName: userName,
        });
        // console.log(createUser.user);

        //firebase user collection
        await addDoc(collection(db, "users"), {
          userId: createUser.user.uid,
          username: userName.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          dateCreated: Date.now(),
        });
        setLoading(false);
        navigate(ROUTES.DASHBOARD);
      } catch (error) {
        setFullName("");
        setEmailAddress("");
        setPassword("");
        setUserName("");
        setError(error.message);
      }
    } else {
      setError("Username is already taken, please try another");
    }
  };
  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iphone" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary rounded mb-4">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="instagram"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleSignUp} method="POST">
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 rounded border border-gray-primary  mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <input
              aria-label="Enter your Fullname"
              type="text"
              placeholder="Full Name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 rounded border border-gray-primary  mb-2"
              onChange={({ target }) => setFullName(target.value)}
            />
            <input
              aria-label="Enter your UserName"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 rounded border border-gray-primary  mb-2"
              onChange={({ target }) => setUserName(target.value)}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold place-content-center ${
                isInvalid && `opacity-100`
              }`}
            >
              {isLoading && <img src={Spinner} className="bg-blue-medium" />}
              Sign Up
            </button>

            <p className="flex text-xs text-gray-base text-center w-full mx-auto my-4">
              By signing up, you agree to our Terms, Data Policy and Cookie
              Policy.
            </p>
          </form>
        </div>

        <div className="flex justify-center text-center flex-col w-full bg-white p-4 border border-gray-primary rounded ">
          <p className="text-sm">
            Have an account ?{" "}
            <Link to="/login" className="font-bold text-blue-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
