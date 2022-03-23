import { useContext, useState } from "react";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";
import * as ROUTES from "../constants/routes";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export default function Header() {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  console.log(user);

  const [showModal, setShowModal] = useState(false);

  const auth = getAuth();
  console.log(showModal);

  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8 bg-indigo-500">
      {/* it acts as the container upto screen size lg(1024px) after that it acts has container fluid */}
      <div className="container mx-auto max-w-screen-lg h-full  ">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to={ROUTES.DASHBOARD} aria-label="Instagram logo">
                <img
                  src="/images/logo.png"
                  alt="instagram"
                  className="mt-2 w-6/12"
                />
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center flex items-center align-items">
            {user ? (
              <>
                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </Link>
                <div
                  className="relative w-8 h-8 mr-6"
                  onClick={() => {
                    setShowModal(!showModal);
                  }}
                >
                  <img
                    src="/images/avatars/pavan.jpg"
                    className={`w-full h-full rounded-full cursor-pointer ${
                      showModal && `border border-red-600 p-0.5 `
                    }`}
                  ></img>
                  {showModal && (
                    <div className="absolute h-52 w-52 -left-36 -bottom-56 bg-white-medium  shadow-xl z-40">
                      <div className="border-b border-gray-primary h-3/4 p-4 grid grid-rows-4 gap-4 justify-items-start">
                        <h1>Profile</h1>
                        <h1>Profile</h1>
                        <h1>Profile</h1>
                        <h1>Profile</h1>
                      </div>
                      <div className="p-4 grid justify-items-start">
                        <Link to={ROUTES.LOGIN}>
                          <button
                            type="button"
                            title="Sign Out"
                            onClick={() => signOut(auth)}
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                signOut(auth);
                              }
                            }}
                          >
                            Logout
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                  >
                    Login
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type="button"
                    className="font-bold text-sm rounded text-blue-medium w-20 h-8"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
