import { searchCompanies } from "../services/search.service.js";

export const searchCompanySuggestions = async (req, res) => {
    try {
        const suggestions = await searchCompanies(req.query.query);

        res.json({
            success: true,
            suggestions
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
