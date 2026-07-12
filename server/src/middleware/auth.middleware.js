import User from "../models/User.js";
import { verifyAuthToken } from "../utils/jwt.js";

export const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || "";
        const [scheme, token] = authHeader.split(" ");

        if (scheme !== "Bearer" || !token) {
            return res.status(401).json({
                success: false,
                message: "Authentication token is required",
            });
        }

        const payload = verifyAuthToken(token);
        const user = await User.findById(payload.sub);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User no longer exists",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired authentication token",
        });
    }
};
