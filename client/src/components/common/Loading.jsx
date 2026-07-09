import { LoaderCircle } from "lucide-react";

const Loading = () => {

    return (

        <div className="py-24 flex justify-center">

            <div
            className="
            w-full
            max-w-2xl
            rounded-3xl
            bg-white/90
            border
            border-slate-200
            p-12
            text-center
            shadow-xl
            shadow-slate-200/70
            ">

                <LoaderCircle

                    size={65}

                    className="
                    mx-auto
                    animate-spin
                    text-blue-400
                    "

                />

                <h2 className="mt-8 text-4xl font-black text-slate-950">

                    AI is analyzing...

                </h2>

                <p className="mt-4 text-slate-400 text-lg">

                    Collecting financial data,
                    news articles,
                    competitor information,
                    and generating an AI report.

                </p>

            </div>

        </div>

    );

};

export default Loading;
