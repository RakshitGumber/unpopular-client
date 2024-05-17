import React, { useRef, useState } from "react";
import "./Landing.css";
import { Navbar } from "../../components";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaLinkedin, FaSquareGithub, FaSquareXTwitter } from "react-icons/fa6";
import { IconContext } from "react-icons";

const Landing = () => {
  const heroRef = useRef(null);

  const getDimensions = (ref) => {
    return {
      width: ref.current?.offsetWidth,
      height: ref.current?.offsetHeight,
    };
  };

  const { width, height } = getDimensions(heroRef);
  const ORIGSPEEDX = 10;
  const ORIGSPEEDY = 10;
  const DURATION = 0.2;

  const [positionOne, setPositonOne] = useState({ x: 0, y: 0 });
  const [positionTwo, setPositonTwo] = useState({
    x: 0,
    y: 0,
  });
  const [positionThree, setPositonThree] = useState({ x: 0, y: 0 });
  const [speedOne, setSpeedOne] = useState({ x: ORIGSPEEDX, y: ORIGSPEEDY });
  const [speedTwo, setSpeedTwo] = useState({ x: ORIGSPEEDX, y: ORIGSPEEDY });
  const [speedThree, setSpeedThree] = useState({
    x: ORIGSPEEDX,
    y: ORIGSPEEDY,
  });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const overlayOpacity = useTransform(() =>
    scrollYProgress.get() > 0.7 ? scrollYProgress.get() : 0.7
  );
  const navOpacity = useTransform(() =>
    scrollYProgress.get() >= 1.0 ? scrollYProgress.get() : 0
  );

  const { userToken } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const onGetStartedClick = () => {
    if (userToken) navigate("/home");
    else navigate("/user/signup");
  };

  return (
    <>
      <Navbar className="bg-none" />
      <main className="body">
        <section className="hero" ref={heroRef}>
          <motion.div
            className="overlay"
            style={{
              opacity: overlayOpacity,
            }}
          />
          <motion.div
            animate={{
              x: positionOne.x,
              y: positionOne.y,
              transition: {
                ease: "linear",
                duration: DURATION,
              },
            }}
            className="glower1"
            onAnimationComplete={() => {
              setPositonOne({
                ...positionOne,
                x: positionOne.x + speedOne.x,
                y: positionOne.y + speedOne.y,
              });
              if (positionOne.x >= 240) {
                setSpeedOne({ ...speedOne, x: -ORIGSPEEDX });
              }
              if (positionOne.x <= -width + 240) {
                setSpeedOne({ ...speedOne, x: ORIGSPEEDX });
              }

              if (positionOne.y >= height - 240) {
                setSpeedOne({ ...speedOne, y: -ORIGSPEEDY });
              }

              if (positionOne.y <= -240) {
                setSpeedOne({ ...speedOne, y: ORIGSPEEDY });
              }
            }}
          />
          <motion.div
            animate={{
              x: positionTwo.x,
              y: positionTwo.y,
              transition: {
                ease: "linear",
                duration: DURATION,
              },
            }}
            className="glower2"
            onAnimationComplete={() => {
              setPositonTwo({
                ...positionTwo,
                x: positionTwo.x + speedTwo.x,
                y: positionTwo.y + speedTwo.y,
              });
              if (positionTwo.x <= -176) {
                setSpeedTwo({ ...speedTwo, x: ORIGSPEEDX });
              }
              if (positionTwo.x >= width - 176) {
                setSpeedTwo({ ...speedTwo, x: -ORIGSPEEDX });
              }
              if (positionTwo.y >= height - 176) {
                setSpeedTwo({ ...speedTwo, y: -ORIGSPEEDY });
              }
              if (positionTwo.y <= -176) {
                setSpeedTwo({ ...speedTwo, y: ORIGSPEEDY });
              }
            }}
          />
          <motion.div
            animate={{
              x: positionThree.x,
              y: positionThree.y,
              transition: {
                ease: "linear",
                duration: DURATION,
              },
            }}
            className="glower3"
            onAnimationComplete={() => {
              setPositonThree({
                ...positionThree,
                x: positionThree.x + speedThree.x,
                y: positionThree.y + speedThree.y,
              });
              if (positionThree.x <= -120) {
                setSpeedThree({ ...speedThree, x: ORIGSPEEDX });
              }
              if (positionThree.x >= width - 120) {
                setSpeedThree({ ...speedThree, x: -ORIGSPEEDX });
              }
              if (positionThree.y >= 120) {
                setSpeedThree({ ...speedThree, y: -ORIGSPEEDY });
              }
              if (positionThree.y <= -height + 120) {
                setSpeedThree({ ...speedThree, y: ORIGSPEEDY });
              }
            }}
          />
          <div className="content">
            <h1 className="hero-head-text">UNPOPULAR</h1>
            <p className="hero-desc">Because your unpopular opinion matters</p>
            <motion.button
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ filter: "brightness(0.5)" }}
              onClick={onGetStartedClick}
            >
              Get Started
            </motion.button>
          </div>
        </section>
        <div className="divider" />
        <motion.div className="sticky-nav-bg" style={{ opacity: navOpacity }} />
        <section className="what-is-sec">
          <div className="what-is-left">
            <h2 className="heading-text">What is Unpopular?</h2>
            <p className="desc-text">
              Unpopular is a platform made for everyone because we believe your
              unpopular opinion matters. Our mission is to provide a safe and
              inclusive space where users can freely express their unique
              perspectives without fear of judgment or censorship.
            </p>
            <p className="desc-text">
              Unlike other social media platforms that often amplify the loudest
              and most popular voices, Unpopular celebrates diversity of thought
              and encourages meaningful discussions on a wide range of topics.
              Whether your opinion challenges the status quo, introduces a fresh
              viewpoint, or simply stands out from the mainstream, Unpopular is
              the place where your voice can be heard and valued. Join our
              community to share your insights, engage in lively debates, and
              connect with others who appreciate the power of different
              opinions.
            </p>
          </div>
          <div className="what-is-right">
            <div className="box"></div>
          </div>
        </section>
        <div className="divider" />
        <section className="about-sec">
          <div className="avatar">
            <img
              src="/assets/myImage.jpg"
              alt="RakshitGumberProfilePic"
              className="avatar-image"
            />
          </div>
          <div className="content">
            <p className="un-text strong-text">Full Stack Web Developer</p>
            <p className="strong-text">Rakshit Gumber</p>
            <p className="desc-text p-left-0">
              I am Rakshit Gumber, a full stack web developer, and I created
              Unpopular as a platform where every opinion, especially the
              unpopular ones, truly matters. Our mission is to celebrate
              diversity of thought and foster meaningful discussions in a safe
              and inclusive space.
            </p>
          </div>
        </section>
        <div className="divider"></div>
        <section className="contact">
          <div className="contact-left">
            <h2 className="heading-text">Connect With me</h2>
            <div className="connections">
              <IconContext.Provider value={{ className: "card-icon" }}>
                <Link
                  to={"https://www.linkedin.com/in/gumber-rakshit/"}
                  className="card"
                  target="_blank"
                >
                  <FaLinkedin />
                </Link>
                <Link
                  to={"https://twitter.com/Gumber_Rakshit"}
                  className="card"
                  target="_blank"
                >
                  <FaSquareXTwitter />
                </Link>
                <Link
                  to={"https://github.com/RakshitGumber"}
                  className="card"
                  target="_blank"
                >
                  <FaSquareGithub />
                </Link>
              </IconContext.Provider>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p className="desc-text">
          Copyright© 2024 Rakshit-Gumber All rights reserved
        </p>
      </footer>
    </>
  );
};

export default Landing;
