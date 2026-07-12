import { getDemoUser } from "../auth/demoUser.js";
import { signAuthToken } from "../utils/jwt.js";

const sendAuthResponse = (res, user, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        token: signAuthToken(user),
        user,
    });
};

export const demoLogin = async (req, res) => {
    try {
        const user = getDemoUser();

        return sendAuthResponse(res, user);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Unable to start demo session",
        });
    }
};

export const me = async (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user,
    });
};
