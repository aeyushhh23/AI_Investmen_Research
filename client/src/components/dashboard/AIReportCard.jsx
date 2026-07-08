import {
    Brain,
    TrendingUp,
    ShieldCheck,
    CircleDollarSign
} from "lucide-react";

const AIReportCard = ({ report }) => {

    if (!report) return null;

    return (

        <div className="
            rounded-3xl
            bg-gradient-to-br
            from-slate-900
            to-slate-800
            border
            border-slate-700
            p-8
            shadow-xl
            hover:border-blue-500
            transition-all
        ">

            <div className="flex items-center gap-4 mb-8">

                <div className="
                    w-16
                    h-16
                    rounded-2xl
                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-500
                    flex
                    items-center
                    justify-center
                ">

                    <Brain className="text-white" size={34} />

                </div>

                <div>

                    <h2 className="text-3xl font-black">

                        AI Investment Report

                    </h2>

                    <p className="text-slate-400">

                        Generated using Gemini AI

                    </p>

                </div>

            </div>

            <div className="grid md:grid-cols-3 gap-6">

                <StatCard
                    icon={<TrendingUp className="text-green-400"/>}
                    title="Recommendation"
                    value={report.recommendation}
                />

                <StatCard
                    icon={<ShieldCheck className="text-blue-400"/>}
                    title="Confidence"
                    value={`${report.confidence}%`}
                />

                <StatCard
                    icon={<CircleDollarSign className="text-yellow-400"/>}
                    title="Risk"
                    value={report.risk}
                />

            </div>

            <div className="
                mt-8
                rounded-2xl
                bg-slate-950/40
                border
                border-slate-700
                p-8
            ">

                <h3 className="text-2xl font-bold mb-4">

                    AI Summary

                </h3>

                <p className="text-slate-300 leading-9">

                    {report.summary}

                </p>

            </div>

        </div>

    );

};

const StatCard = ({ icon, title, value }) => (

    <div className="
        rounded-2xl
        bg-slate-950/40
        border
        border-slate-700
        p-6
    ">

        <div className="flex items-center gap-3">

            {icon}

            <span className="text-slate-400">

                {title}

            </span>

        </div>

        <h3 className="mt-6 text-3xl font-black">

            {value}

        </h3>

    </div>

);

export default AIReportCard;