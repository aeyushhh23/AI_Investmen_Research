import { TrendingUp } from "lucide-react";

const Footer=()=>{

    return(

        <footer
        className="
        mt-24
        border-t
        border-slate-800
        ">

            <div
            className="
            max-w-screen-2xl
            mx-auto
            py-10
            px-6
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-6
            ">

                <div className="flex items-center gap-3">

                    <TrendingUp className="text-blue-400"/>

                    <span className="font-bold">

                        AI Investment Research

                    </span>

                </div>

                <p className="text-slate-500">

                    Powered by React • Gemini • Finnhub • Node.js

                </p>

                <p className="text-slate-600">

                    © 2026

                </p>

            </div>

        </footer>

    );

};

export default Footer;