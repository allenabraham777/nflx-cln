import React, { useRef, useState, useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import classnames from "classnames";
import BackgroundImage from "../../components/BackgroundImage";
import Header from "../../components/Header";

import { firebaseAuth } from "../../utils/firebase";

import t from "./text";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Nextflix Clone";
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) navigate("/");
    });
  }, []);

  const handleLogin = async () => {
    if (loading) return;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) return;

    setLoading(true);
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      if (
        error.message.includes("auth/user-not-found") ||
        error.message.includes("auth/wrong-password")
      ) {
        toast.error(t.toastError("USER"));
      } else {
        toast.error(t.toastError());
      }
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-[100vh] w-[100vw]">
      <BackgroundImage />
      <div className="absolute top-0 left-0 w-[100%]">
        <Header />
      </div>
      <div className="flex flex-col p-12 text-white bg-[rgba(0,0,0,0.7)] rounded-sm">
        <h1 className="text-2xl font-bold mb-4">{t.title()}</h1>
        <div className="flex flex-col justify-center items-center">
          <input
            className="py-2 px-6 text-sm h-12 my-4 outline-none w-[100%] rounded-sm bg-zinc-800"
            type="email"
            name="email"
            placeholder={t.emailAddress()}
            ref={emailRef}
          />
          <input
            className="py-2 px-6 text-sm h-12 mb-8 outline-none w-[100%] rounded-sm bg-zinc-800"
            type="password"
            name="password"
            placeholder={t.password()}
            ref={passwordRef}
          />
          <button
            className="bg-[#E50914] text-white py-2 w-[100%] text-sm font-bold outline-none rounded-sm"
            onClick={handleLogin}
          >
            {t.getStarted()}
          </button>
        </div>
        <div className="mt-12 text-gray-400 text-sm">
          <p>
            {t.newToNetflix()}{" "}
            <Link to="/signup" className="text-white">
              {t.signup()}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
