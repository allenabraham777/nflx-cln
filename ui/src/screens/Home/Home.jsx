import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    document.title = "Home - Nextflix Clone";
    window.onscroll = () => {
      setIsScrolled(window.pageXOffset === 0 ? false : true);
      return () => {
        window.onscroll = null;
      };
    };

    return () => {
      window.onscroll = null;
    };
  }, []);
  return (
    <div className="bg-zinc-900 text-white">
      <Navbar isScrolled={isScrolled} />
    </div>
  );
};

export default Home;
