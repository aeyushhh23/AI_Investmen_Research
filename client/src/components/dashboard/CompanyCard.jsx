import {
    Building2,
    Globe,
    Landmark,
    Calendar,
    BadgeDollarSign,
    ExternalLink
} from "lucide-react";

const CompanyCard = ({ company }) => {

    if (!company) return null;

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
            hover:border-blue-500
            hover:shadow-blue-500/20
            hover:-translate-y-2
            transition-all
            duration-300
        ">

            <div className="flex items-center gap-5">

                <img
                    src={company.logo}
                    alt={company.companyName}
                    className="
                        w-24
                        h-24
                        rounded-full
                        bg-white
                        object-contain
                        p-3
                        shadow-lg
                    "
                />

                <div>

                    <h2 className="text-3xl font-black">

                        {company.companyName}

                    </h2>

                    <p className="text-blue-400 font-semibold mt-2">

                        {company.symbol}

                    </p>

                </div>

            </div>

            <div className="mt-10 space-y-6">

                <Info icon={<Building2 size={20}/>} title="Industry" value={company.industry}/>
                <Info icon={<Globe size={20}/>} title="Country" value={company.country}/>
                <Info icon={<Landmark size={20}/>} title="Exchange" value={company.exchange}/>
                <Info icon={<Calendar size={20}/>} title="IPO" value={company.ipo}/>
                <Info icon={<BadgeDollarSign size={20}/>} title="Currency" value={company.currency}/>

            </div>

            <a

                href={company.weburl}
                target="_blank"
                rel="noreferrer"

                className="
                    mt-10
                    inline-flex
                    items-center
                    gap-2
                    text-blue-400
                    hover:text-cyan-400
                    transition
                "

            >

                Official Website

                <ExternalLink size={18}/>

            </a>

        </div>

    );

};

const Info = ({ icon, title, value }) => (

    <div className="flex justify-between items-center">

        <div className="flex items-center gap-3 text-slate-400">

            {icon}

            {title}

        </div>

        <span className="font-semibold text-right">

            {value}

        </span>

    </div>

);

export default CompanyCard;