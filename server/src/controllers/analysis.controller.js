import { analyzeInvestment } from "../services/analysis.service.js";

export const analyzeCompany = async (req, res) => {

    try {

        const { company } = req.body;

        if (!company) {

            return res.status(400).json({

                success: false,

                message: "Company name is required"

            });

        }

        const analysis =
            await analyzeInvestment(company);

        return res.status(200).json({

            success: true,

            analysis

        });

    }

    catch(error){

        console.error(error);

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};