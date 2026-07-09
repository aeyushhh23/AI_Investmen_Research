import { useEffect, useState } from "react";
import { ThemeContext } from "./themeStore";

export const ThemeProvider = ({ children }) => {

    const [darkMode, setDarkMode] = useState(() => {

        return localStorage.getItem("theme") === "dark";

    });

    useEffect(() => {

        if (darkMode) {

            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
            localStorage.setItem("theme", "dark");

        } else {

            document.documentElement.classList.remove("dark");
            document.documentElement.classList.add("light");
            localStorage.setItem("theme", "light");

        }

    }, [darkMode]);

    return (

        <ThemeContext.Provider
            value={{
                darkMode,
                setDarkMode
            }}
        >

            {children}

        </ThemeContext.Provider>

    );

};
