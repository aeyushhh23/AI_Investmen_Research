import {
    ShieldCheck,
    TrendingUp,
    AlertTriangle
} from "lucide-react";

const ScoreCard = ({ scores }) => {

    if (!scores) return null;

    const scoreColor =
        scores.investmentScore >= 80
            ? "text-green-400"
            : scores.investmentScore >= 60
            ? "text-yellow-400"
            : "text-red-400";

    return (

        <div className="
            h-full
            rounded-3xl
            bg-gradient-to-br
            from-slate-900
            to-slate-800
            border
            border-slate-700
            shadow-xl
            p-8
            hover:border-cyan-500
            hover:shadow-cyan-500/20
            hover:-translate-y-2
            transition-all
        ">

            <div className="flex items-center gap-3">

                <ShieldCheck
                    className="text-blue-400"
                    size={28}
                />

                <h2 className="text-3xl font-black">

                    AI Score

                </h2>

            </div>

            <div className="flex justify-center mt-10">

                <div className="
                    w-52
                    h-52
                    rounded-full
                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-400
                    p-2
                ">

                    <div className="
                        w-full
                        h-full
                        rounded-full
                        bg-slate-900
                        flex
                        items-center
                        justify-center
                    ">

                        <span className={`text-7xl font-black ${scoreColor}`}>

                            {scores.investmentScore}

                        </span>

                    </div>

                </div>

            </div>

            <div className="space-y-6 mt-10">

                <div className="flex justify-between">

                    <span className="flex items-center gap-2 text-slate-400">

                        <TrendingUp size={18}/>

                        Recommendation

                    </span>

                    <span className="
                        px-4
                        py-1
                        rounded-full
                        bg-green-500/20
                        text-green-400
                        font-bold
                    ">

                        {scores.recommendation}

                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="flex items-center gap-2 text-slate-400">

                        <AlertTriangle size={18}/>

                        Risk

                    </span>

                    <span className="font-bold">

                        {scores.risk}

                    </span>

                </div>

            </div>

        </div>

    );

};

export default ScoreCard;