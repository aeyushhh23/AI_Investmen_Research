import {
    Building2,
    TrendingUp,
    TrendingDown
} from "lucide-react";

const CompetitorCard = ({ competitors }) => {

    if (!competitors?.length) return null;

    return (

        <div>

            <h2 className="text-4xl font-black mb-8">

                Competitor Analysis

            </h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                {competitors.map((company) => (

                    <div
                        key={company.symbol}
                        className="
                            rounded-3xl
                            bg-gradient-to-br
                            from-slate-900
                            to-slate-800
                            border
                            border-slate-700
                            p-8
                            hover:border-blue-500
                            hover:-translate-y-2
                            transition-all
                        "
                    >

                        <div className="flex items-center gap-4">

                            <div className="
                                w-14
                                h-14
                                rounded-xl
                                bg-blue-500/20
                                flex
                                items-center
                                justify-center
                            ">

                                <Building2 className="text-blue-400"/>

                            </div>

                            <div>

                                <h3 className="text-2xl font-bold">

                                    {company.symbol}

                                </h3>

                                <p className="text-slate-400">

                                    {company.name}

                                </p>

                            </div>

                        </div>

                        <div className="mt-8 space-y-5">

                            <Row
                                label="Industry"
                                value={company.industry}
                            />

                            <Row
                                label="Current Price"
                                value={`$${company.currentPrice}`}
                            />

                            <div className="flex justify-between">

                                <span className="text-slate-400">

                                    Daily Change

                                </span>

                                <span
                                    className={`flex items-center gap-2 ${
                                        company.change >= 0
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >

                                    {company.change >= 0
                                        ? <TrendingUp size={18}/>
                                        : <TrendingDown size={18}/>
                                    }

                                    {company.change}%

                                </span>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

};

const Row = ({ label, value }) => (

    <div className="flex justify-between">

        <span className="text-slate-400">

            {label}

        </span>

        <span className="font-semibold text-right">

            {value}

        </span>

    </div>

);

export default CompetitorCard;