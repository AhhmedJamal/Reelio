import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { BiUser } from "react-icons/bi";
import { FaRegMoon } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { RiShoppingCartLine } from "react-icons/ri";
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { toast, Bounce } from "react-toastify";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "en");
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const basePosition = { x: 0, y: 0 };
  const codeDis = "Fliio40";

  const links = [
    "header.offers",
    "header.category",
    "header.bestSellers",
    "header.about",
  ];

  const icons = [
    <RiShoppingCartLine size={22} className="mb-[2px]" />,
    <BiUser size={24} />,
    <FiSearch size={24} />,
    <FaRegMoon size={20} onClick={toggleDarkMode} />,
  ];

  const message = `Get a discount 40% when using Code: ${codeDis}`;

  // Announcement bar motion value
  const x = useMotionValue(0);
  const containerRef = useRef(null);
  const speed = 50; // pixels per second
  const pauseRef = useRef(false);

  // Pause/Resume on hover
  const handleMouseEnter = () => (pauseRef.current = true);
  const handleMouseLeave = () => (pauseRef.current = false);

  // Animation frame loop
  useAnimationFrame((_, delta) => {
    if (!pauseRef.current && containerRef.current) {
      const direction = lang === "ar" ? 1 : -1; // العربية تتحرك لليمين
      x.set(x.get() + (direction * (speed * delta)) / 1000);

      if (lang === "en" && x.get() <= -containerRef.current.scrollWidth / 2) {
        x.set(10);
      } else if (
        lang === "ar" &&
        x.get() >= containerRef.current.scrollWidth / 2
      ) {
        x.set(10);
      }
    }
  });

  // Function to generate hover animation for icons
  const generateHoverBounce = () => ({
    x: [2, 0, -1, 0],
    y: [2, 0, 1, 2],
    transition: { repeat: 0, duration: 1, ease: "easeInOut" },
  });

  // Toggle language function
  const toggleLanguage = () => {
    const newLang = lang === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    setLang(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.body.style.textAlign = newLang === "ar" ? "right" : "left";
  };

  // Toggle dark mode function
  function toggleDarkMode() {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }

  const notify = () =>
    toast.success(`Code copied: ${codeDis}`, {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  return (
    <div className="header border-b border-neutral-300">
      {/* Top announcement bar */}
      <div
        className="top-nav bg-black text-[var(--light)] py-2 overflow-hidden whitespace-nowrap"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={containerRef}
      >
        <motion.div
          className="inline-flex cursor-pointer"
          style={{ x }}
          onClick={() => {
            navigator.clipboard.writeText(codeDis);
            notify();
          }}
          dir={lang === "ar" ? "rtl" : "ltr"} // يغير اتجاه العنصر حسب اللغة
        >
          {Array.from({ length: 20 }).map((_, idx) => (
            <span key={idx} className="px-4">
              {message}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Main navigation */}
      <div className="main-nav container mx-auto flex items-center justify-between h-20">
        {/* Buttons and icons */}
        <div className="btn flex items-center gap-2.5 cursor-pointer md:min-w-48 h-full">
          {/* Language toggle button */}
          <div className="h-full rtl:border-l ltr:border-r border-neutral-300 flex justify-center items-center">
            <button
              onClick={toggleLanguage}
              className="px-2 py-1 bg-neutral-200 dark:bg-neutral-700 rounded mx-2 "
            >
              {lang === "en" ? "AR" : "EN"}
            </button>
          </div>

          {/* Icons with hover animation */}
          {icons.map((icon, index) => (
            <motion.div
              key={index}
              animate={basePosition}
              whileHover={generateHoverBounce()}
              className="flex items-center "
            >
              {icon}
            </motion.div>
          ))}
        </div>

        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 400 }}
          className="logo text-4xl font-bold"
        >
          <p className="rubik-regular">{t("header.logo")}</p>
        </motion.div>

        {/* Navigation links */}
        <div className="links">
          <HiMenuAlt4
            size={30}
            className="mx-2 md:hidden z-30 relative"
            onClick={() => setIsMenuOpen(true)}
          />
          <div
            className={`menu-mobile absolute z-0 top-0 transition-all duration-300 ease-in-out ${
              isMenuOpen ? "right-0" : "-right-full"
            } h-full w-full bg-[var(--dark)] bg-opacity-95 z-50 md:hidden`}
          >
            <IoMdClose
              size={30}
              className="relative text-white left-3 top-3"
              onClick={() => setIsMenuOpen(false)}
            />
          </div>
          <ul className=" gap-6 hidden md:flex">
            {links.map((linkKey) => (
              <motion.li
                key={linkKey}
                className="relative cursor-pointer h-10 flex items-center justify-center"
                initial="initial"
                whileHover="hovered"
              >
                {/* Original text */}
                <motion.span
                  variants={{
                    initial: { opacity: 1, scale: 1, y: 0 },
                    hovered: { opacity: 0, scale: 0, y: -20 },
                  }}
                  transition={{ duration: 0.5 }}
                  className="relative pointer-events-none"
                >
                  {t(linkKey)}
                </motion.span>

                {/* Hover replacement text */}
                <motion.span
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    hovered: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute px-3 py-[2px] bg-[var(--dark)] text-[var(--light)] dark:bg-[var(--light)] dark:text-[var(--dark)] rounded text-nowrap pointer-events-none"
                >
                  {t(linkKey)}
                </motion.span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
