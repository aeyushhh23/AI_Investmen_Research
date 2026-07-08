import {
    TrendingUp,
    Moon,
    Sun
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
const Navbar=()=>{

    return(

        <header
        className="
        sticky
        top-0
        z-50
        backdrop-blur-xl
        bg-slate-950/70
        border-b
        border-slate-800
        ">

            <div
            className="
            max-w-screen-2xl
            mx-auto
            px-6
            md:px-10
            h-20
            flex
            items-center
            justify-between
            ">

                <div className="flex items-center gap-4">

                    <div
                    className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-500
                    flex
                    items-center
                    justify-center
                    shadow-xl
                    ">

                        <TrendingUp
                        size={30}
                        className="text-white"
                        />

                    </div>

                    <div>

                        <h1
                        className="
                        text-3xl
                        font-black
                        bg-gradient-to-r
                        from-blue-400
                        to-cyan-400
                        bg-clip-text
                        text-transparent
                        ">

                            AI Investment Research

                        </h1>

                        <p className="text-slate-400 text-sm">

                            Gemini AI • Finnhub

                        </p>

                    </div>

                </div>

                <div
                className="
                hidden
                lg:flex
                gap-8
                text-slate-400
                ">

                    <button className="hover:text-blue-400 transition">

                        Dashboard

                    </button>

                    <button className="hover:text-blue-400 transition">

                        Market

                    </button>

                    <button className="hover:text-blue-400 transition">

                        Portfolio

                    </button>

                </div>

            </div>

        </header>

    );

};

export default Navbar;