import {
    DollarSign,
    TrendingUp,
    TrendingDown,
    Activity,
    BarChart3
} from "lucide-react";

const FinancialCard = ({ financials }) => {

    if (!financials) return null;

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
            hover:border-green-500
            hover:shadow-green-500/20
            hover:-translate-y-2
            transition-all
        ">

            <h2 className="text-3xl font-black mb-10">

                Financial Overview

            </h2>

            <div className="space-y-7">

                <Item icon={<DollarSign/>} title="Current Price" value={`$${financials.currentPrice}`}/>
                <Item icon={<TrendingUp/>} title="High" value={`$${financials.highPrice}`}/>
                <Item icon={<TrendingDown/>} title="Low" value={`$${financials.lowPrice}`}/>
                <Item icon={<BarChart3/>} title="Open" value={`$${financials.openPrice}`}/>
                <Item icon={<Activity/>} title="Previous Close" value={`$${financials.previousClose}`}/>

            </div>

        </div>

    );

};

const Item = ({ icon, title, value }) => (

    <div className="flex justify-between items-center">

        <div className="flex items-center gap-3 text-slate-400">

            {icon}

            {title}

        </div>

        <span className="font-bold text-lg">

            {value}

        </span>

    </div>

);

export default FinancialCard;