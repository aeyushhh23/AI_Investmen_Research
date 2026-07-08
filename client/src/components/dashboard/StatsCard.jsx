import {
    TrendingUp,
    TrendingDown
} from "lucide-react";

const StatsCard = ({
    title,
    value,
    color="text-white",
    positive
})=>{

    return(

        <div
        className="
        bg-gradient-to-br
        from-slate-900
        to-slate-800
        rounded-3xl
        border
        border-slate-700
        p-8
        shadow-xl
        hover:-translate-y-2
        hover:border-blue-500
        hover:shadow-blue-500/20
        transition-all
        duration-300
        ">

            <div className="flex justify-between items-center">

                <span className="
                text-slate-400
                uppercase
                tracking-wider
                ">

                    {title}

                </span>

                {positive!==undefined &&(

                    positive

                    ?

                    <TrendingUp
                    className="text-green-400"
                    size={28}
                    />

                    :

                    <TrendingDown
                    className="text-red-400"
                    size={28}
                    />

                )}

            </div>

            <h2 className={`mt-8 text-5xl font-black ${color}`}>

                {value}

            </h2>

        </div>

    );

};

export default StatsCard;