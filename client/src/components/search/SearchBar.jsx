import { useState } from "react";
import { Search, Sparkles } from "lucide-react";

const companies = [
    "Tesla",
    "Apple",
    "Microsoft",
    "Nvidia",
    "Amazon",
    "Google"
];

const SearchBar = ({ onSearch, loading }) => {

    const [company, setCompany] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!company.trim()) return;

        onSearch(company);

    };

    const quickSearch = (name) => {

        setCompany(name);

        onSearch(name);

    };

    return (

        <div className="mt-8">

            <form
                onSubmit={handleSubmit}
                className="flex flex-col lg:flex-row gap-5"
            >

                <div className="relative flex-1">

                    <Search
                        size={24}
                        className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input

                        type="text"

                        value={company}

                        onChange={(e)=>setCompany(e.target.value)}

                        placeholder="Search Tesla, Apple, Nvidia..."

                        className="
                        w-full
                        h-16
                        rounded-2xl
                        bg-slate-900
                        border
                        border-slate-700
                        pl-16
                        pr-6
                        text-lg
                        text-white
                        placeholder:text-slate-500
                        outline-none
                        focus:border-blue-500
                        focus:ring-4
                        focus:ring-blue-500/20
                        transition
                        "

                    />

                </div>

                <button

                    type="submit"

                    disabled={loading}

                    className="
px-5
py-2
rounded-full
bg-slate-900
border
border-slate-700
text-slate-300
font-medium
hover:bg-blue-600
hover:border-blue-500
hover:text-white
transition-all
duration-300
hover:scale-105
"

                >

                    <div className="flex items-center gap-3">

                        <Sparkles size={15}/>

                        {loading ? "Analyzing..." : "Analyze"}

                    </div>

                </button>

            </form>

            <div className="flex flex-wrap justify-center gap-4 mt-8">

                {companies.map((item)=>(

                    <button

                        key={item}

                        onClick={()=>quickSearch(item)}

                        className="
px-5
py-2
rounded-full
bg-slate-900
border
border-slate-700
text-slate-300
font-medium
hover:bg-blue-600
hover:border-blue-500
hover:text-white
transition-all
duration-300
hover:scale-105
"

                    >

                        {item}

                    </button>

                ))}

            </div>

        </div>

    );

};

export default SearchBar;