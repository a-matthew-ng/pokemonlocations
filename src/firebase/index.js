import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import router from "@/router";

const firebaseConfig = {
  apiKey: "AIzaSyDffd0eqvapYQu418CBK0HXxsOydJydM5s",
  authDomain: "pokelocationv1-31822.firebaseapp.com",
  projectId: "pokelocationv1-31822",
  storageBucket: "pokelocationv1-31822.appspot.com",
  messagingSenderId: "767400106133",
  appId: "1:767400106133:web:d44579485b072526f5e39c",
  measurementId: "G-13BSBMG4NT",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//utils
const auth = getAuth(app);

//Login
const loginPoke = async (mail, password) => {
  try {
    await signInWithEmailAndPassword(auth, mail, password).then(() => {
      router.push("/homePage");
    });
  } catch (error) {
    console.log(error.code);
    if (error.code === "auth/user-not-found") {
      alert("Error: No existe un usuario con ese correo electrónico.");
    } else if (error.code === "auth/wrong-password") {
      alert("Error: La contraseña es incorrecta.");
    } else if (error.code === "auth/invalid-credential") {
      alert("Error de credenciales");
    }
  }
};

function closePoke() {
  auth
    .signOut()
    .then(() => {
      router.push("/");
    })
    .catch((error) => {
      console.error("Error al cerrar sesión:", error);
    });
}

function verifyStatusUse() {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      router.push("/");
    } 
  });
}
export { auth, loginPoke, closePoke, verifyStatusUse };
