import { getHistoricalData } from "../services/chart.service.js";

export const getChart = async (req, res) => {

    try {

        const { symbol } = req.params;

        const chart = await getHistoricalData(symbol);

        res.json({
            success: true,
            chart
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};