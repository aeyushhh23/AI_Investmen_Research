import {
    Calendar,
    ExternalLink
} from "lucide-react";

const NewsCard = ({ article }) => {

    return (

        <a

            href={article.url}

            target="_blank"

            rel="noreferrer"

            className="
            block
            rounded-3xl
            overflow-hidden
            bg-gradient-to-br
            from-slate-900
            to-slate-800
            border
            border-slate-700
            shadow-xl
            hover:border-blue-500
            hover:-translate-y-2
            transition-all
            duration-300
            "

        >

            <img

                src={article.image}

                alt={article.headline}

                className="
                w-full
                h-56
                object-cover
                hover:scale-105
                transition
                duration-500
                "

            />

            <div className="p-6">

                <h2 className="text-2xl font-bold line-clamp-2">

                    {article.headline}

                </h2>

                <div className="
                mt-4
                flex
                items-center
                gap-2
                text-slate-400
                ">

                    <Calendar size={16}/>

                    {new Date(
                        article.datetime * 1000
                    ).toLocaleDateString()}

                </div>

                <div className="
                mt-6
                flex
                items-center
                gap-2
                text-blue-400
                font-semibold
                ">

                    Read Article

                    <ExternalLink size={18}/>

                </div>

            </div>

        </a>

    );

};

export default NewsCard;