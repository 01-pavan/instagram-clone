import Firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/auth";

//calling seed file (only once)

// import { seedDatabase } from "../seed";

const config = {
  apiKey: "AIzaSyCcE96tmKyQKObg8v7btshQzmVcwSadoDE",
  authDomain: "instagram-clone-5df5c.firebaseapp.com",
  projectId: "instagram-clone-5df5c",
  storageBucket: "instagram-clone-5df5c.appspot.com",
  messagingSenderId: "708373210871",
  appId: "1:708373210871:web:8da7278be45049749455f2",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

//here is where we want to call the seed file (only once)
// seedDatabase(firebase);

export { firebase, FieldValue };
