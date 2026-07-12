import { Activity, BrainCircuit, FileSearch, LoaderCircle, Newspaper } from "lucide-react";

const Loading = () => {
    const loadingSteps = [
        { label: "Financials", icon: Activity },
        { label: "News", icon: Newspaper },
        { label: "Report", icon: FileSearch },
    ];

    const loadingBars = [48, 72, 58, 88, 64, 96, 76];

    return (

        <div className="py-24 flex justify-center">

            <div
            className="
            loading-card
            relative
            overflow-hidden
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

                <div className="loading-core mx-auto">
                    <span className="loading-core-ring" />
                    <span className="loading-core-ring loading-core-ring-delay" />

                    <div className="loading-core-icon">
                        <BrainCircuit size={34} />
                    </div>
                </div>

                <div className="loading-console mx-auto mt-8">
                    <div className="loading-scan-line" />

                    <div className="loading-console-top">
                        <span>Market signal scan</span>
                        <LoaderCircle
                            size={16}
                            className="animate-spin"
                        />
                    </div>

                    <div className="loading-bars">
                        {loadingBars.map((height, index) => (
                            <span
                                key={`${height}-${index}`}
                                style={{
                                    "--bar-height": `${height}%`,
                                    "--bar-delay": `${index * 0.12}s`,
                                }}
                            />
                        ))}
                    </div>
                </div>

                <h2 className="mt-8 text-4xl font-black text-slate-950">

                    AI is analyzing...

                </h2>

                <div className="loading-steps mt-7">
                    {loadingSteps.map(({ label, icon: Icon }, index) => (
                        <span
                            key={label}
                            className="loading-step"
                            style={{ "--step-delay": `${index * 0.32}s` }}
                        >
                            <Icon size={16} />
                            {label}
                        </span>
                    ))}
                </div>

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
