import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, useContext } from "react";
import FirebaseContext from "../context/firebase";

export default function useAuthListener() {
  const auth = getAuth();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    //refer firebase docs
    const listener = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        //if we have the auth user then we have to set the local storage
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });
    return () => listener();
  }, [firebase]);

  return { user };
}
