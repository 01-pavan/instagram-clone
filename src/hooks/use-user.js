import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getUserByUserId } from "../services/firebase";

export default function useUser() {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);
  //   console.log("user", user);
  useEffect(() => {
    async function getUserObjByUserId() {
      //we need a function that we can call (firebase service) that gets the user data based on the id

      const [response] = await getUserByUserId(user.uid);
      console.log("response", response);
      setActiveUser(response);
    }
    // console.log("uid", user.uid);
    if (user?.uid) {
      //this check is because .. getUserByUserId function should call only when the user is present
      getUserObjByUserId();
    }
  }, [user]);
  //   console.log("active user", activeUser);

  return { user: activeUser };
}
