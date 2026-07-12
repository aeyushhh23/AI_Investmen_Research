import { useState } from "react";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import {
    Activity,
    ArrowUpRight,
    BrainCircuit,
    Download,
    LineChart,
    LoaderCircle,
    Sparkles,
    TrendingUp,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Container from "../components/layout/Container";
import CursorField from "../components/common/CursorField";
import Loading from "../components/common/Loading";
import SearchBar from "../components/search/SearchBar";
import StatsCard from "../components/dashboard/StatsCard";
import CompanyCard from "../components/dashboard/CompanyCard";
import FinancialCard from "../components/dashboard/FinancialCard";
import MarketIndices from "../components/dashboard/MarketIndices";
import ScoreCard from "../components/dashboard/ScoreCard";
import StockChart from "../components/dashboard/StockChart";
import AIReportCard from "../components/dashboard/AIReportCard";
import SWOTCard from "../components/dashboard/SWOTCard";
import CompetitorCard from "../components/dashboard/CompetitorCard";
import NewsCard from "../components/dashboard/NewsCard";
import { analyzeCompany } from "../services/api";
import { downloadPDF } from "../utils/downloadPDF";

const formatCurrency = (value, currency = "USD") => {
    const number = Number(value);

    if (!Number.isFinite(number)) {
        return "N/A";
    }

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
    }).format(number);
};

const pageVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
            staggerChildren: 0.08,
        },
    },
};

const revealVariants = {
    hidden: { opacity: 0, y: 28, scale: 0.98 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const heroTextVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.05,
        },
    },
};

const heroItemVariants = {
    hidden: { opacity: 0, x: -36, filter: "blur(10px)" },
    show: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.72,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const heroVisualVariants = {
    hidden: { opacity: 0, x: 46, scale: 0.94 },
    show: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            duration: 0.78,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const resultVariants = {
    hidden: { opacity: 0, y: 34 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const chartBars = [42, 58, 51, 74, 63, 88, 79, 94];

const signalNodes = [
    { className: "left-[10%] top-[18%]", delay: 0 },
    { className: "right-[16%] top-[12%]", delay: 0.5 },
    { className: "right-[9%] bottom-[22%]", delay: 1 },
    { className: "left-[18%] bottom-[14%]", delay: 1.5 },
];

const backgroundVideoSources = [
    { src: "/videos/market-background.webm", type: "video/webm" },
    { src: "/videos/market-background.mp4", type: "video/mp4" },
];

const backgroundCandles = [
    { left: "7%", bottom: "18%", height: "86px", delay: "0s", tone: "up" },
    { left: "13%", bottom: "26%", height: "118px", delay: "-1.2s", tone: "down" },
    { left: "20%", bottom: "21%", height: "78px", delay: "-2.4s", tone: "up" },
    { left: "31%", bottom: "35%", height: "132px", delay: "-.7s", tone: "up" },
    { left: "39%", bottom: "30%", height: "96px", delay: "-3s", tone: "down" },
    { left: "52%", bottom: "42%", height: "146px", delay: "-1.8s", tone: "up" },
    { left: "63%", bottom: "33%", height: "110px", delay: "-2.9s", tone: "down" },
    { left: "76%", bottom: "46%", height: "158px", delay: "-.4s", tone: "up" },
    { left: "86%", bottom: "38%", height: "104px", delay: "-2.1s", tone: "down" },
];

const backgroundTickers = [
    "NIFTY +1.24%",
    "SENSEX -0.32%",
    "NASDAQ +2.18%",
    "AAPL +1.76",
    "NVDA +4.08",
    "TSLA -1.14",
    "MSFT +0.92",
];

const Dashboard = () => {
    const [loading, setLoading] = useState(false);
    const [exporting, setExporting] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = async (company) => {
        try {
            setLoading(true);
            setError("");
            setAnalysis(null);

            const response = await analyzeCompany(company);

            setAnalysis(response.analysis);
            toast.success("Analysis Completed");
        } catch (err) {
            console.error(err);

            setError("Failed to analyze company.");
            toast.error("Unable to analyze company");
        } finally {
            setLoading(false);
        }
    };

    const handleExportPDF = async () => {
        if (!analysis) {
            return;
        }

        try {
            setExporting(true);

            await downloadPDF({
                analysis,
                companyName: analysis.company?.companyName,
            });

            toast.success("PDF report downloaded");
        } catch (err) {
            console.error(err);
            toast.error("Unable to export PDF");
        } finally {
            setExporting(false);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            <CursorField />
            <video
                className="dashboard-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
                tabIndex={-1}
            >
                {backgroundVideoSources.map((source) => (
                    <source
                        key={source.src}
                        src={source.src}
                        type={source.type}
                    />
                ))}
            </video>
            <div
                className="dashboard-video-scrim"
                aria-hidden="true"
            />
            <div
                className="dashboard-backdrop"
                aria-hidden="true"
            >
                <div className="market-chart-video">
                    <svg
                        className="market-chart-svg"
                        viewBox="0 0 1200 520"
                        preserveAspectRatio="none"
                    >
                        <path
                            className="market-chart-area market-chart-area-rise"
                            d="M0 430 C120 360 190 390 270 308 C360 215 430 250 505 178 C590 98 705 150 790 92 C900 20 1010 86 1200 38 L1200 520 L0 520 Z"
                        />
                        <path
                            className="market-chart-line market-chart-rise"
                            d="M0 430 C120 360 190 390 270 308 C360 215 430 250 505 178 C590 98 705 150 790 92 C900 20 1010 86 1200 38"
                        />
                        <path
                            className="market-chart-line market-chart-fall"
                            d="M0 130 C112 88 180 118 260 170 C344 222 395 198 475 282 C555 365 640 300 718 358 C818 434 930 360 1028 422 C1090 462 1140 450 1200 486"
                        />
                        <path
                            className="market-chart-line market-chart-mid"
                            d="M0 282 C120 250 200 270 292 238 C398 202 470 230 548 198 C645 158 718 210 806 168 C910 120 1022 160 1200 116"
                        />
                    </svg>

                    <div className="market-candles">
                        {backgroundCandles.map((candle) => (
                            <span
                                key={`${candle.left}-${candle.bottom}`}
                                className={`market-candle market-candle-${candle.tone}`}
                                style={{
                                    left: candle.left,
                                    bottom: candle.bottom,
                                    height: candle.height,
                                    animationDelay: candle.delay,
                                }}
                            />
                        ))}
                    </div>

                    <div className="market-ticker-ribbon market-ticker-ribbon-one">
                        {backgroundTickers.map((ticker) => (
                            <span key={ticker}>{ticker}</span>
                        ))}
                    </div>

                    <div className="market-ticker-ribbon market-ticker-ribbon-two">
                        {backgroundTickers.slice().reverse().map((ticker) => (
                            <span key={ticker}>{ticker}</span>
                        ))}
                    </div>
                </div>

                <span className="market-wave market-wave-one" />
                <span className="market-wave market-wave-two" />
                <span className="market-stream market-stream-one" />
                <span className="market-stream market-stream-two" />
                <span className="market-trace market-trace-one" />
                <span className="market-trace market-trace-two" />
                <span className="market-scan" />
            </div>

            <div className="relative z-10">
                <Navbar />

                <main className="flex justify-center">
                    <Container>
                        <motion.section
                            variants={pageVariants}
                            initial="hidden"
                            animate="show"
                            className="py-12 sm:py-16"
                        >
                            <motion.section
                                variants={revealVariants}
                                className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(420px,.86fr)] lg:gap-16"
                            >
                                <motion.div
                                    variants={heroTextVariants}
                                    className="max-w-4xl text-left"
                                >
                                    <motion.div
                                        variants={heroItemVariants}
                                        whileHover={{ y: -2, scale: 1.01 }}
                                        transition={{ type: "spring", stiffness: 320, damping: 18 }}
                                        className="inline-flex items-center gap-3 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2"
                                    >
                                        <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_18px_rgba(74,222,128,.75)]" />

                                        <p className="hero-eyebrow text-sm font-medium text-blue-300">
                                            AI Powered Investment Research Platform
                                        </p>
                                    </motion.div>

                                    <motion.h1
                                        variants={heroItemVariants}
                                        className="hero-title gradient-text mt-10 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl xl:text-7xl"
                                    >
                                        Professional
                                        <br />
                                        Stock Intelligence
                                    </motion.h1>

                                    <motion.p
                                        variants={heroItemVariants}
                                        className="hero-copy mt-8 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl sm:leading-9"
                                    >
                                        Analyze any public company using financial data, AI reasoning,
                                        news sentiment, SWOT analysis, competitor research and
                                        investment scoring.
                                    </motion.p>

                                    <motion.div
                                        variants={heroItemVariants}
                                        className="mt-12 max-w-4xl"
                                    >
                                        <div className="premium-shell card-hover rounded-[28px] p-3">
                                            <div className="relative z-10">
                                                <SearchBar
                                                    onSearch={handleSearch}
                                                    loading={loading}
                                                    align="left"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>

                                    <AnimatePresence mode="wait">
                                        {loading && (
                                            <motion.div
                                                key="loading"
                                                initial={{ opacity: 0, y: 16 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -12 }}
                                                transition={{ duration: 0.25 }}
                                            >
                                                <Loading />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <AnimatePresence>
                                        {error && (
                                            <motion.div
                                                key="error"
                                                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                                                className="mt-6 max-w-xl rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm font-semibold text-red-300"
                                            >
                                                {error}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                <motion.div
                                    variants={heroVisualVariants}
                                    className="hero-visual relative mx-auto min-h-[360px] w-full max-w-[560px] sm:min-h-[430px] lg:min-h-[520px]"
                                    aria-hidden="true"
                                >
                                    <div className="hero-orbit hero-orbit-one" />
                                    <div className="hero-orbit hero-orbit-two" />

                                    {signalNodes.map((node) => (
                                        <motion.span
                                            key={node.className}
                                            className={`hero-signal-node absolute ${node.className}`}
                                            animate={{ scale: [1, 1.45, 1], opacity: [0.45, 1, 0.45] }}
                                            transition={{
                                                duration: 2.4,
                                                repeat: Infinity,
                                                delay: node.delay,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    ))}

                                    <motion.div
                                        className="hero-intel-panel absolute left-0 top-10 w-[74%] rounded-[28px] border border-white/10 bg-slate-900/70 p-5 shadow-2xl shadow-blue-950/20 backdrop-blur-2xl sm:p-6"
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{
                                            duration: 6,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase text-emerald-300">
                                                <Activity size={14} />
                                                Live Signal
                                            </span>

                                            <LineChart
                                                size={24}
                                                className="text-cyan-300"
                                            />
                                        </div>

                                        <div className="mt-8 flex items-end gap-3">
                                            <span className="text-4xl font-black text-white sm:text-5xl">
                                                87
                                            </span>
                                            <span className="mb-2 text-sm font-semibold text-emerald-300">
                                                +12.4% edge
                                            </span>
                                        </div>

                                        <div className="mt-7 flex h-32 items-end gap-3">
                                            {chartBars.map((height, index) => (
                                                <motion.span
                                                    key={`${height}-${index}`}
                                                    className="hero-chart-bar flex-1 rounded-t-full bg-gradient-to-t from-blue-600 via-cyan-400 to-emerald-300"
                                                    initial={{ height: 10 }}
                                                    animate={{ height: `${height}%` }}
                                                    transition={{
                                                        duration: 1.2,
                                                        delay: 0.18 + index * 0.08,
                                                        repeat: Infinity,
                                                        repeatType: "mirror",
                                                        repeatDelay: 2,
                                                        ease: [0.16, 1, 0.3, 1],
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="hero-float-card absolute right-0 top-4 w-[48%] rounded-3xl border border-white/10 bg-white/80 p-4 shadow-xl shadow-slate-900/10 backdrop-blur-xl dark:bg-slate-950/74"
                                        animate={{ y: [0, 14, 0], rotate: [0, 1.4, 0] }}
                                        transition={{
                                            duration: 7,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <Sparkles
                                                size={20}
                                                className="text-fuchsia-400"
                                            />
                                            <ArrowUpRight
                                                size={18}
                                                className="text-emerald-400"
                                            />
                                        </div>

                                        <span className="mt-5 block text-sm font-bold text-slate-900 dark:text-white">
                                            Sentiment
                                        </span>
                                        <span className="mt-1 block text-2xl font-black text-slate-900 dark:text-white">
                                            Bullish
                                        </span>
                                    </motion.div>

                                    <motion.div
                                        className="hero-float-card absolute bottom-14 right-4 w-[54%] rounded-3xl border border-white/10 bg-slate-950/80 p-4 shadow-xl shadow-cyan-950/20 backdrop-blur-xl"
                                        animate={{ y: [0, -16, 0], rotate: [0, -1.2, 0] }}
                                        transition={{
                                            duration: 6.5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-300">
                                                <BrainCircuit size={20} />
                                            </span>
                                            <div>
                                                <span className="block text-xs font-semibold uppercase text-slate-400">
                                                    AI Score
                                                </span>
                                                <span className="block text-xl font-black text-white">
                                                    94/100
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="hero-ticker absolute bottom-3 left-5 flex items-center gap-3 overflow-hidden rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-3 text-sm font-bold text-blue-100 backdrop-blur-xl"
                                        animate={{ x: [0, 12, 0] }}
                                        transition={{
                                            duration: 5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        <TrendingUp
                                            size={18}
                                            className="text-emerald-300"
                                        />
                                        <span>AAPL +2.8</span>
                                        <span>NVDA +4.1</span>
                                        <span>MSFT +1.6</span>
                                    </motion.div>
                                </motion.div>
                            </motion.section>

                            <MarketIndices />

                            <motion.div
                                variants={revealVariants}
                                className="mt-12 flex justify-center sm:justify-end"
                            >
                                <motion.button
                                    type="button"
                                    whileHover={
                                        analysis && !exporting
                                            ? { y: -3, scale: 1.02 }
                                            : undefined
                                    }
                                    whileTap={
                                        analysis && !exporting
                                            ? { scale: 0.96 }
                                            : undefined
                                    }
                                    transition={{ type: "spring", stiffness: 360, damping: 18 }}
                                    onClick={handleExportPDF}
                                    disabled={!analysis || exporting}
                                    className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:shadow-blue-500/35 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:shadow-blue-500/25"
                                >
                                    {exporting ? (
                                        <LoaderCircle
                                            size={18}
                                            className="animate-spin"
                                        />
                                    ) : (
                                        <Download size={18} />
                                    )}

                                    Export Report
                                </motion.button>
                            </motion.div>

                            <AnimatePresence>
                                {analysis && (
                                    <motion.div
                                        key={analysis.company?.symbol || "analysis"}
                                        initial="hidden"
                                        animate="show"
                                        exit={{ opacity: 0, y: 18 }}
                                        variants={{
                                            hidden: { opacity: 0 },
                                            show: {
                                                opacity: 1,
                                                transition: {
                                                    staggerChildren: 0.1,
                                                    delayChildren: 0.08,
                                                },
                                            },
                                        }}
                                    >
                                        <motion.div
                                            variants={resultVariants}
                                            className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
                                        >
                                            <StatsCard
                                                title="Current Price"
                                                value={formatCurrency(
                                                    analysis.financials?.currentPrice,
                                                    analysis.financials?.currency
                                                )}
                                                color="text-green-400"
                                            />

                                            <StatsCard
                                                title="Daily Change"
                                                value={`${analysis.financials?.percentChange ?? 0}%`}
                                                color={
                                                    analysis.financials?.percentChange >= 0
                                                        ? "text-green-400"
                                                        : "text-red-400"
                                                }
                                                positive={analysis.financials?.percentChange >= 0}
                                            />

                                            <StatsCard
                                                title="Investment Score"
                                                value={`${analysis.scores?.investmentScore ?? 0}/100`}
                                                color="text-blue-400"
                                            />

                                            <StatsCard
                                                title="Risk"
                                                value={analysis.scores?.risk || "N/A"}
                                                color={
                                                    analysis.scores?.risk === "Low"
                                                        ? "text-green-400"
                                                        : analysis.scores?.risk === "Medium"
                                                          ? "text-yellow-400"
                                                          : "text-red-400"
                                                }
                                            />
                                        </motion.div>

                                        <motion.div
                                            variants={resultVariants}
                                            className="mt-14 grid grid-cols-1 gap-8 xl:grid-cols-12"
                                        >
                                            <div className="h-full xl:col-span-5">
                                                <CompanyCard company={analysis.company} />
                                            </div>

                                            <div className="h-full xl:col-span-4">
                                                <FinancialCard financials={analysis.financials} />
                                            </div>

                                            <div className="h-full xl:col-span-3">
                                                <ScoreCard scores={analysis.scores} />
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            variants={resultVariants}
                                            className="mt-16"
                                        >
                                            <StockChart
                                                financials={analysis.financials}
                                                historical={analysis.historical}
                                            />
                                        </motion.div>

                                        <motion.div
                                            variants={resultVariants}
                                            className="mt-16"
                                        >
                                            <AIReportCard report={analysis.aiReport} />
                                        </motion.div>

                                        <motion.div
                                            variants={resultVariants}
                                            className="mt-16"
                                        >
                                            <SWOTCard report={analysis.aiReport} />
                                        </motion.div>

                                        <motion.div
                                            variants={resultVariants}
                                            className="mt-16"
                                        >
                                            <CompetitorCard competitors={analysis.competitors} />
                                        </motion.div>

                                        <motion.div
                                            variants={resultVariants}
                                            className="mt-20"
                                        >
                                            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                                                <div>
                                                    <h2 className="text-3xl font-black sm:text-4xl">
                                                        Market News
                                                    </h2>
                                                    <div className="soft-divider mt-4 w-40" />
                                                </div>

                                                <div className="section-kicker text-sm font-semibold uppercase tracking-[0.22em]">
                                                    Latest Financial Headlines
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                                {analysis.news?.slice(0, 6).map((article, index) => (
                                                    <motion.div
                                                        key={`${article.url || article.title}-${index}`}
                                                        initial={{ opacity: 0, y: 30, scale: 0.98 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        transition={{
                                                            delay: index * 0.06,
                                                            duration: 0.5,
                                                            ease: [0.16, 1, 0.3, 1],
                                                        }}
                                                    >
                                                        <NewsCard article={article} />
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.section>
                    </Container>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
