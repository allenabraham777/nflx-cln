import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import classnames from "classnames";
import BackgroundImage from "../../components/BackgroundImage";
import Header from "../../components/Header";

import { firebaseAuth } from "../../utils/firebase";

import t from "./text";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title =
      "Netflix Clone – Watch TV Shows Online, Watch Movies Online";
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) navigate("/");
    });
  }, []);

  const handleGetStarted = async () => {
    if (loading) return;
    if (!showPassword) {
      setShowPassword(true);
      return;
    }
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) return;

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      if (error.message.includes("auth/email-already-in-use")) {
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
      <div className="fixed top-0 left-0 w-[100%]">
        <Header login />
      </div>
      <div className="flex flex-col text-center items-center justify-center p-6 md:p-0">
        <div className="flex flex-col text-white overflow-hidden md:max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold">{t.title()}</h1>
          <h2 className="text-xl font-medium my-4">{t.subtitle()}</h2>
          <h6 className="text-sm mb-4">{t.membershipMessage()}</h6>
        </div>
        <div
          className={classnames(
            "flex flex-col justify-center items-center md:flex-row",
            { "md:flex-col": showPassword }
          )}
        >
          <input
            className={classnames(
              "py-2 px-6 text-sm h-12 my-2 md:my-0 md:w-96 outline-none w-[100%]",
              { "rounded-sm": showPassword }
            )}
            type="email"
            name="email"
            placeholder={t.emailAddress()}
            ref={emailRef}
          />
          <input
            className={classnames(
              "py-2 px-6 text-sm h-12 my-4 md:w-96 outline-none w-[100%] rounded-sm",
              { hidden: !showPassword }
            )}
            type="password"
            name="password"
            placeholder={t.password()}
            ref={passwordRef}
          />
          <button
            className={classnames(
              "bg-[#E50914] text-white h-12 px-6 py-2 text-lg font-bold outline-none",
              { "px-12 rounded-sm": showPassword }
            )}
            onClick={handleGetStarted}
          >
            {t.getStarted(showPassword)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
