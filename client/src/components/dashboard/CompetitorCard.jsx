import { motion } from "framer-motion";
import {
    Building2,
    TrendingDown,
    TrendingUp,
} from "lucide-react";

const CompetitorCard = ({ competitors }) => {
    if (!competitors?.length) return null;

    return (
        <div>
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h2 className="text-3xl font-black sm:text-4xl">
                        Competitor Analysis
                    </h2>
                    <div className="soft-divider mt-4 w-44" />
                </div>

                <p className="section-kicker text-sm font-semibold uppercase tracking-[0.22em]">
                    Peer Comparison
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {competitors.map((company, index) => (
                    <motion.div
                        key={company.symbol}
                        initial={{ opacity: 0, y: 24, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                            delay: index * 0.06,
                            duration: 0.45,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        whileHover={{ y: -7, scale: 1.01 }}
                        className="magnetic-card relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl"
                    >
                        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/10 blur-[110px]" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-500/20">
                                    <Building2 className="text-blue-400" />
                                </div>

                                <div className="min-w-0">
                                    <h3 className="truncate text-2xl font-bold">
                                        {company.symbol}
                                    </h3>

                                    <p className="truncate text-slate-400">
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

                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-slate-400">
                                        Daily Change
                                    </span>

                                    <span
                                        className={`flex items-center gap-2 font-semibold ${
                                            company.change >= 0
                                                ? "text-green-400"
                                                : "text-red-400"
                                        }`}
                                    >
                                        {company.change >= 0
                                            ? <TrendingUp size={18} />
                                            : <TrendingDown size={18} />
                                        }

                                        {company.change}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const Row = ({ label, value }) => (
    <div className="flex items-center justify-between gap-4">
        <span className="text-slate-400">
            {label}
        </span>

        <span className="min-w-0 break-words text-right font-semibold">
            {value}
        </span>
    </div>
);

export default CompetitorCard;
