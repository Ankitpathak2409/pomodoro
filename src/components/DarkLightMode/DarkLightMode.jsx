import "../../index.css";
import "./DarkLightMode.css";
import useLocalStorage from "../../hooks/useLocalStorage";
import { FaSun, FaMoon } from "react-icons/fa";
import { useEffect } from "react";

const DarkLightMode = () => {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [theme]);

  return (
    <button className="darkLightMode" onClick={toggleTheme}>
      {theme === "light" ? (
        <FaMoon size={22} color="#333" />
      ) : (
        <FaSun size={22} color="#f39c12" />
      )}
    </button>
  );
};

export default DarkLightMode;
