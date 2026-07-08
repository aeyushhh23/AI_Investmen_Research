    import { useState } from "react";
    import toast from "react-hot-toast";
    import { motion } from "framer-motion";
    import Navbar from "../components/layout/Navbar";
    import Container from "../components/layout/Container";
    import Loading from "../components/common/Loading";
    import SearchBar from "../components/search/SearchBar";
    import Features from "../components/home/Features";
    import StatsCard from "../components/dashboard/StatsCard";
    import CompanyCard from "../components/dashboard/CompanyCard";
    import FinancialCard from "../components/dashboard/FinancialCard";
    import ScoreCard from "../components/dashboard/ScoreCard";

    import StockChart from "../components/dashboard/StockChart";
    import AIReportCard from "../components/dashboard/AIReportCard";
    import SWOTCard from "../components/dashboard/SWOTCard";
    import CompetitorCard from "../components/dashboard/CompetitorCard";
    import NewsCard from "../components/dashboard/NewsCard";
    import Footer from "../components/layout/Footer";
    import { analyzeCompany } from "../services/api";

    const Dashboard = () => {

        const [loading, setLoading] = useState(false);
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
        

        return (

            <div className="min-h-screen bg-slate-950">

                <Navbar />

                <main className="flex justify-center">

                    <Container>

                        <section className="py-16">

                            <div className="text-center">

        <span className="
        inline-block
        px-5
        py-2
        rounded-full
        bg-blue-500/10
        border
        border-blue-500/30
        text-blue-400
        font-semibold
        ">

            Make Smarter Investment Decisions

        </span>

        <h1 className="
        mt-8
        text-4xl
        lg:text-5xl
        font-black
        bg-gradient-to-r
        from-blue-400
        via-cyan-400
        to-indigo-400
        bg-clip-text
        text-transparent
        ">

            
            AI Investment Research & Analysis Platform

        </h1>

        {/* <p className="
        mt-8
        text-slate-400
        text-xl
        max-w-3xl
        mx-auto
        leading-9
        ">

            Analyze stocks using AI, live financial data,
            market news, SWOT analysis, competitor comparison
            and investment recommendations.

        </p> */}

    </div>

                            <div cclassName="max-w-6xl mx-auto">

                                <SearchBar
                                    onSearch={handleSearch}
                                    loading={loading}
                                />
                            {loading && <Loading />}
                            </div>

                            {error && (

                                <div className="
                                    mt-8
                                    rounded-2xl
                                    border
                                    border-red-500
                                    bg-red-500/20
                                    p-5
                                    text-center
                                    text-red-300
                                ">

                                    {error}

                                </div>

                            )}
                            {!analysis && !loading && (

        <div
        className="
        mt-16
        rounded-3xl
        bg-gradient-to-br
        from-slate-900
        to-slate-800
        border
        border-slate-700
        p-16
        text-center
        ">

                {/* <h2 className="text-5xl font-black">

                    Search Any Company

                </h2> */}

            

        </div>

    )}
    {!analysis && !loading && (

    <div
    className="
    mt-20
    rounded-3xl
    bg-gradient-to-br
    from-slate-900
    to-slate-800
    border
    border-slate-700
    p-20
    text-center
    ">

    <h2 className="text-5xl font-black">

    Search Any Company

    </h2>

    <p className="mt-6 text-slate-400">

    Tesla • Apple • Nvidia • Microsoft • Amazon • Google

    </p>
    {!analysis && !loading && (
        <>
            {/* Search Any Company card */}

            <Features />
        </>
    )}

    </div>

    )}
                            {analysis && (

                                <>

                                    {/* Statistics */}

                                    <div className="
                                        mt-14
                                        grid
                                        grid-cols-1
                                        sm:grid-cols-2
                                        xl:grid-cols-4
                                        gap-8
                                    ">

                                        <StatsCard
                                            title="Current Price"
                                            value={`$${analysis.financials.currentPrice}`}
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
                                        gap-8
                                    ">

                                        <motion.div
        className="xl:col-span-4 h-full"
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
        className="xl:col-span-4 h-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
    >
        <ScoreCard scores={analysis.scores} />
    </motion.div>

                                    </div>

                                    {/* Stock Chart */}

                                    <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
    >
        <StockChart financials={analysis.financials} />
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

                                    <div className="mt-16">

                                        <h2 className="
                                            text-4xl
                                            font-bold
                                            mb-8
                                        ">
                                            Latest News
                                        </h2>

                                        <div className="
                                            grid
                                            grid-cols-1
                                            md:grid-cols-2
                                            xl:grid-cols-3
                                            gap-8
                                        ">

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

                                </>

                            )}

                        </section>

                    </Container>

                </main>

            </div>

        );

    };
    <Footer/>

    export default Dashboard;