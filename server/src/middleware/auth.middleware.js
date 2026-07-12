import { getDemoUser } from "../auth/demoUser.js";
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
        const user = getDemoUser();

        if (payload.sub !== user.id || payload.email !== user.email) {
            return res.status(401).json({
                success: false,
                message: "Invalid demo session",
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
