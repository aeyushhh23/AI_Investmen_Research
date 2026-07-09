    import { useState } from "react";
    import toast from "react-hot-toast";
    import { motion } from "framer-motion";
    import { Download, LoaderCircle } from "lucide-react";
    import Navbar from "../components/layout/Navbar";
    import Container from "../components/layout/Container";
    import CursorField from "../components/common/CursorField";
    import Loading from "../components/common/Loading";
    import SearchBar from "../components/search/SearchBar";
    import StatsCard from "../components/dashboard/StatsCard";
    import CompanyCard from "../components/dashboard/CompanyCard";
    import FinancialCard from "../components/dashboard/FinancialCard";
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
            maximumFractionDigits: 2
        }).format(number);
    };

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
                

            }
            
            catch (err) {

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
                    companyName: analysis.company?.companyName
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
  <div className="blur-orb orb-left" />
  <div className="blur-orb orb-right" />

  <div className="relative z-10">
  <Navbar />
                <main className="flex justify-center">

                    <Container>

                        <section className="py-16">

                           <motion.section
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: .6 }}
    className="text-center max-w-6xl mx-auto"
>

    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-blue-500/20 bg-blue-500/10">

        <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"/>

        <p className="hero-eyebrow text-sm font-medium text-blue-300">

            AI Powered Investment Research Platform

        </p>

    </div>

    <h1
        className="
        mt-10
        text-5xl
        lg:text-6xl
        font-black
        leading-tight
        hero-title
        gradient-text
        "
    >

        Professional
        <br/>

        Stock Intelligence

    </h1>

    <p
        className="
        mt-8
        text-xl
        hero-copy
        text-slate-400
        max-w-3xl
        mx-auto
        leading-9
        "
    >

        Analyze any public company using financial data,
        AI reasoning,
        news sentiment,
        SWOT analysis,
        competitor research
        and investment scoring.

    </p>
    <div className="mt-12 max-w-5xl mx-auto">

    <div className="glass card-hover p-3">

        <SearchBar
            onSearch={handleSearch}
            loading={loading}
        />

    </div>

</div>

{loading && <Loading />}

{error && (
    <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm font-semibold text-red-300">
        {error}
    </div>
)}

</motion.section>

                            <div className="mt-12 flex justify-end">

                                <motion.button
                                    type="button"
                                    whileHover={
                                        analysis && !exporting
                                            ? { y: -2, scale: 1.02 }
                                            : undefined
                                    }
                                    whileTap={
                                        analysis && !exporting
                                            ? { scale: 0.96 }
                                            : undefined
                                    }
                                    onClick={handleExportPDF}
                                    disabled={!analysis || exporting}
                                    className="
                                    inline-flex
                                    items-center
                                    gap-3
                                    rounded-2xl
                                    bg-gradient-to-r
                                    from-blue-600
                                    to-cyan-500
                                    px-6
                                    py-3
                                    font-bold
                                    text-white
                                    shadow-lg
                                    shadow-blue-500/25
                                    transition
                                    hover:shadow-blue-500/35
                                    disabled:cursor-not-allowed
                                    disabled:opacity-45
                                    disabled:hover:shadow-blue-500/25
                                    "
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

                            </div>
   
                            {analysis && (

                                <div>

                                    {/* Statistics */}

                                    <div className="
                                        mt-14
                                        grid
                                        grid-cols-1
                                        sm:grid-cols-2
                                        xl:grid-cols-4
                                        gap-10
                                    ">

                                        <StatsCard
                                            title="Current Price"
                                            value={formatCurrency(
                                                analysis.financials.currentPrice,
                                                analysis.financials.currency
                                            )}
                                            color="text-green-400"
                                        />

                                        <StatsCard
                                            title="Daily Change"
                                            value={`${analysis.financials.percentChange}%`}
                                            color={
                                                analysis.financials.percentChange >= 0
                                                    ? "text-green-400"
                                                    : "text-red-400"
                                            }
                                            positive={analysis.financials.percentChange >= 0}
                                        />

                                        <StatsCard
                                            title="Investment Score"
                                            value={`${analysis.scores.investmentScore}/100`}
                                            color="text-blue-400"
                                        />

                                        <StatsCard
                                            title="Risk"
                                            value={analysis.scores.risk}
                                            color={
                                                analysis.scores.risk === "Low"
                                                    ? "text-green-400"
                                                    : analysis.scores.risk === "Medium"
                                                    ? "text-yellow-400"
                                                    : "text-red-400"
                                            }
                                        />

                                    </div>

                                    {/* Main Cards */}

                                    <div className="
                                        mt-14
                                        grid
                                        grid-cols-1
                                        xl:grid-cols-12
                                        gap-10
                                    ">

                                        <motion.div
        className="xl:col-span-5 h-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
    >
        <motion.div
    initial={{opacity:0,y:30}}
    animate={{opacity:1,y:0}}
    transition={{duration:.5}}
    >

    <CompanyCard company={analysis.company}/>

    </motion.div>
    </motion.div>

                                        <motion.div
        className="xl:col-span-4 h-full"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
    >
        <FinancialCard financials={analysis.financials} />
    </motion.div>

                                        <motion.div
        className="xl:col-span-3 h-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
    >
        <ScoreCard scores={analysis.scores} />
    </motion.div>

                                    </div>

                                    {/* Stock Chart */}

                                   <motion.div
className="mt-20 glass p-8"
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:.8}}
>
        <StockChart
            financials={analysis.financials}
            historical={analysis.historical}
        />
    </motion.div>

                                    {/* AI Report */}

                                    <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
    >
        <AIReportCard report={analysis.aiReport} />
    </motion.div>

                                    {/* SWOT */}

                                    <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
    >
        <SWOTCard report={analysis.aiReport} />
    </motion.div>
                                    {/* Competitors */}

                                    <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1 }}
    >
        <CompetitorCard competitors={analysis.competitors} />
    </motion.div>

                                    {/* News */}

                                    <div className="mt-20 flex items-center justify-between mb-8">

                                        <h2 className="text-4xl font-black">
                                           Market News
                                        </h2>

                                        <div className="text-slate-400">
                                            Latest Financial Headlines
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {analysis.news?.slice(0, 6).map((article, index) => (

                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    delay: index * 0.1,
                                                    duration: 0.5
                                                }}
                                            >
                                                <NewsCard article={article} />
                                            </motion.div>

                                        ))}
                                    </div>

                                </div>

                            )}

                        </section>

                    </Container>

                </main>
  </div>

            </div>

        );

    };
    

    export default Dashboard;
