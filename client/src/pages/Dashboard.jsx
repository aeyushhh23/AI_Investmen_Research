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

           <div className="min-h-screen">
  <div className="blur-orb orb-left" />
  <div className="blur-orb orb-right" />

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

        <p className="text-sm font-medium text-blue-300">

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

</motion.section>
   
                            {analysis && (

                                <>

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

                                    <div className="flex items-center justify-between mb-8">

                                        <h2 className="text-4xl font-black">
                                           Market News

                                        </h2>

                                        <div className="text-slate-400">
Latest Financial Headlines
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
    

    export default Dashboard;