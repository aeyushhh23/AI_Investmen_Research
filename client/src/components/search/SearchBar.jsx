import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Building2, LoaderCircle, Search } from "lucide-react";
import { fetchCompanySuggestions } from "../../services/api";

const companies = [
    "Tesla",
    "Apple",
    "Microsoft",
    "Nvidia",
    "Amazon",
    "Google",
    "Reliance",
    "TCS",
    "Infosys",
    "HDFC Bank",
    "SBI",
    "Tata Motors",
];

const SearchBar = ({ onSearch, loading, align = "center" }) => {
    const [company, setCompany] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [suggesting, setSuggesting] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    useEffect(() => {
        const query = company.trim();

        if (query.length < 1) {
            return undefined;
        }

        let ignore = false;
        const timeoutId = window.setTimeout(async () => {
            try {
                setSuggesting(true);

                const results = await fetchCompanySuggestions(query);

                if (!ignore) {
                    setSuggestions(results);
                    setShowSuggestions(results.length > 0);
                    setActiveIndex(-1);
                }
            } catch (error) {
                console.error(error);

                if (!ignore) {
                    setSuggestions([]);
                    setShowSuggestions(false);
                }
            } finally {
                if (!ignore) {
                    setSuggesting(false);
                }
            }
        }, 250);

        return () => {
            ignore = true;
            window.clearTimeout(timeoutId);
        };
    }, [company]);

    const selectSuggestion = (suggestion) => {
        setCompany(suggestion.symbol);
        setShowSuggestions(false);
        setActiveIndex(-1);
        onSearch(suggestion.symbol);
    };

    const handleCompanyChange = (e) => {
        const value = e.target.value;

        setCompany(value);

        if (!value.trim()) {
            setSuggestions([]);
            setShowSuggestions(false);
            setActiveIndex(-1);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!company.trim()) return;

        setShowSuggestions(false);
        onSearch(company);
    };

    const handleKeyDown = (e) => {
        if (!showSuggestions || suggestions.length === 0) {
            return;
        }

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((index) => (
                index + 1 >= suggestions.length ? 0 : index + 1
            ));
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((index) => (
                index <= 0 ? suggestions.length - 1 : index - 1
            ));
        }

        if (e.key === "Enter" && activeIndex >= 0) {
            e.preventDefault();
            selectSuggestion(suggestions[activeIndex]);
        }

        if (e.key === "Escape") {
            setShowSuggestions(false);
            setActiveIndex(-1);
        }
    };

    const quickSearch = (name) => {
        setCompany(name);
        setShowSuggestions(false);
        onSearch(name);
    };

    return (
        <div className="mt-8">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 lg:flex-row"
            >
                <div className="relative flex-1">
                    <Search
                        size={24}
                        className="search-icon absolute left-6 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                        type="text"
                        value={company}
                        onChange={handleCompanyChange}
                        onFocus={() => setShowSuggestions(suggestions.length > 0)}
                        onBlur={() => window.setTimeout(() => {
                            setShowSuggestions(false);
                            setActiveIndex(-1);
                        }, 120)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search Reliance, TCS, INFY.NS, AAPL..."
                        className="search-field h-16 w-full rounded-2xl border border-slate-700 bg-slate-900 pl-16 pr-6 text-lg text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                    />

                    {suggesting && (
                        <LoaderCircle
                            size={20}
                            className="absolute right-5 top-1/2 -translate-y-1/2 animate-spin text-blue-300"
                        />
                    )}

                    <AnimatePresence>
                        {showSuggestions && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                                className="search-suggestions absolute left-0 right-0 top-[74px] z-30 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950/95 text-left shadow-2xl shadow-blue-950/40 backdrop-blur-xl"
                            >
                                {suggestions.map((suggestion, index) => (
                                    <motion.button
                                        type="button"
                                        key={suggestion.symbol}
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.025 }}
                                        onMouseDown={(event) => event.preventDefault()}
                                        onClick={() => selectSuggestion(suggestion)}
                                        className={`search-suggestion-row flex w-full items-center gap-4 px-5 py-4 text-left transition ${
                                            activeIndex === index
                                                ? "search-suggestion-active bg-blue-600/25"
                                                : "hover:bg-white/5"
                                        }`}
                                    >
                                        <span className="search-suggestion-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
                                            <Building2 size={19} />
                                        </span>

                                        <span className="min-w-0 flex-1">
                                            <span className="search-suggestion-title block truncate font-bold text-white">
                                                {suggestion.name}
                                            </span>

                                            <span className="search-suggestion-meta mt-1 block truncate text-sm text-slate-400">
                                                {suggestion.symbol}
                                                {suggestion.exchange ? ` - ${suggestion.exchange}` : ""}
                                                {suggestion.currency ? ` - ${suggestion.currency}` : ""}
                                            </span>
                                        </span>

                                        <span className="search-suggestion-type hidden shrink-0 rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-300 sm:inline-flex">
                                            {suggestion.type || "Equity"}
                                        </span>
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={!loading ? { y: -2, scale: 1.02 } : undefined}
                    whileTap={!loading ? { scale: 0.96 } : undefined}
                    className="search-action min-h-16 rounded-2xl border border-slate-700 bg-slate-900 px-7 py-3 font-bold text-slate-300 transition-all duration-300 hover:border-blue-500 hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <div className="flex items-center justify-center gap-3">
                        {loading ? (
                            <LoaderCircle
                                size={17}
                                className="animate-spin"
                            />
                        ) : (
                            <BarChart3 size={17} />
                        )}

                        {loading ? "Analyzing..." : "Analyze"}
                    </div>
                </motion.button>
            </form>

            <div
                className={`mt-8 flex flex-wrap gap-4 ${
                    align === "left" ? "justify-start" : "justify-center"
                }`}
            >
                {companies.map((item, index) => (
                    <motion.button
                        key={item}
                        onClick={() => quickSearch(item)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + index * 0.025 }}
                        whileHover={{ y: -2, scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="search-chip rounded-full border border-slate-700 bg-slate-900 px-5 py-2 font-medium text-slate-300 transition-all duration-300 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
                    >
                        {item}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
