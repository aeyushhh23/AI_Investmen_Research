import {
    Brain,
    Newspaper,
    LineChart,
    Building2
} from "lucide-react";

const features = [
    {
        icon: Brain,
        title: "AI Investment Analysis",
        description:
            "Generate detailed AI-powered investment recommendations using Gemini."
    },
    {
        icon: LineChart,
        title: "Real-Time Market Data",
        description:
            "Live stock prices, financial metrics and interactive charts."
    },
    {
        icon: Building2,
        title: "Competitor Analysis",
        description:
            "Compare companies with their biggest competitors instantly."
    },
    {
        icon: Newspaper,
        title: "Latest Financial News",
        description:
            "Stay updated with the latest company and market news."
    }
];

const Features = () => {

    return (

        <section className="mt-24">

            <h2 className="text-5xl font-black text-center">

                Everything You Need

            </h2>

            <p className="text-slate-400 text-center mt-4 text-lg">

                Professional investment research in one dashboard.

            </p>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mt-16">

                {features.map((feature, index) => {

                    const Icon = feature.icon;

                    return (

                        <div

                            key={index}

                            className="
                            rounded-3xl
                            border
                            border-slate-700
                            bg-gradient-to-br
                            from-slate-900
                            to-slate-800
                            p-8
                            hover:border-cyan-500
                            hover:-translate-y-3
                            hover:shadow-2xl
                            hover:shadow-cyan-500/20
                            transition-all
                            duration-300
                            "

                        >

                            <div
                                className="
                                w-16
                                h-16
                                rounded-2xl
                                bg-gradient-to-r
                                from-blue-500
                                to-cyan-400
                                flex
                                items-center
                                justify-center
                                mb-6
                                "
                            >

                                <Icon
                                    className="text-white"
                                    size={32}
                                />

                            </div>

                            <h3 className="text-2xl font-bold">

                                {feature.title}

                            </h3>

                            <p className="mt-5 text-slate-400 leading-8">

                                {feature.description}

                            </p>

                        </div>

                    );

                })}

            </div>

        </section>

    );

};

export default Features;