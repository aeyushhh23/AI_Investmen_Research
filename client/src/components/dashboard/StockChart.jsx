import {
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

const StockChart = ({ financials }) => {

    if (!financials) return null;

    const data = [
        { name: "Open", value: financials.openPrice },
        { name: "Low", value: financials.lowPrice },
        { name: "Current", value: financials.currentPrice },
        { name: "High", value: financials.highPrice },
        { name: "Close", value: financials.previousClose }
    ];

    return (

        <div className="
            rounded-3xl
            bg-gradient-to-br
            from-slate-900
            to-slate-800
            border
            border-slate-700
            shadow-xl
            p-8
        ">

            <h2 className="text-3xl font-black mb-8">

                Stock Performance

            </h2>

            <div className="h-[450px]">

                <ResponsiveContainer>

                    <AreaChart data={data}>

                        <defs>

                            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">

                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.7}/>

                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>

                            </linearGradient>

                        </defs>

                        <CartesianGrid
                            stroke="#334155"
                            strokeDasharray="5 5"
                        />

                        <XAxis
                            dataKey="name"
                            stroke="#94a3b8"
                        />

                        <YAxis
                            stroke="#94a3b8"
                        />

                        <Tooltip/>

                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#38bdf8"
                            strokeWidth={4}
                            fill="url(#color)"
                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

};

export default StockChart;