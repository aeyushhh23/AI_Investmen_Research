import {
    Shield,
    TriangleAlert,
    Rocket,
    Target
} from "lucide-react";

const SWOTCard = ({ report }) => {

    if (!report?.swot) return null;

    const sections = [

        {
            title: "Strengths",
            color: "border-green-500",
            icon: <Shield className="text-green-400" />,
            data: report.swot.strengths
        },

        {
            title: "Weaknesses",
            color: "border-red-500",
            icon: <TriangleAlert className="text-red-400" />,
            data: report.swot.weaknesses
        },

        {
            title: "Opportunities",
            color: "border-blue-500",
            icon: <Rocket className="text-blue-400" />,
            data: report.swot.opportunities
        },

        {
            title: "Threats",
            color: "border-yellow-500",
            icon: <Target className="text-yellow-400" />,
            data: report.swot.threats
        }

    ];

    return (

        <div>

            <h2 className="text-4xl font-black mb-8">

                SWOT Analysis

            </h2>

            <div className="grid md:grid-cols-2 gap-8">

                {sections.map((section) => (

                    <div
                        key={section.title}
                        className={`
                            rounded-3xl
                            bg-gradient-to-br
                            from-slate-900
                            to-slate-800
                            border
                            ${section.color}
                            p-8
                        `}
                    >

                        <div className="flex items-center gap-3 mb-6">

                            {section.icon}

                            <h3 className="text-2xl font-bold">

                                {section.title}

                            </h3>

                        </div>

                        <ul className="space-y-4">

                            {section.data?.map((item, index) => (

                                <li
                                    key={index}
                                    className="text-slate-300 leading-8"
                                >

                                    • {item}

                                </li>

                            ))}

                        </ul>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default SWOTCard;