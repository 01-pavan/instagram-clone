import { firebase, FieldValue } from "../lib/firebase";

export async function doesUsernameExists(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username.toLowerCase())
    .get();
  // console.log(result.docs.length);

  return result.docs.length > 0;
}

export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();
  // result.docs.forEach((item) => {
  //   console.log("item", item.data());
  // });

  const user = result.docs.map((item) => ({
    ...item.data(),
  }));
  console.log(user);

  return user;
}
