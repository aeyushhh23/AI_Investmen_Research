import bcrypt from "bcrypt";
import User from "../models/User.js";
import { signAuthToken } from "../utils/jwt.js";

const sendAuthResponse = (res, user, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        token: signAuthToken(user),
        user: user.toAuthJSON(),
    });
};

export const demoLogin = async (req, res) => {
    try {
        const email = process.env.DEMO_USER_EMAIL || "demo@ai-investment.local";

        const user = await User.findOneAndUpdate(
            { email },
            {
                $set: {
                    name: process.env.DEMO_USER_NAME || "Demo Analyst",
                    avatar: "",
                    authProvider: "demo",
                },
                $setOnInsert: {
                    email,
                    password: await bcrypt.hash(
                        process.env.DEMO_USER_PASSWORD || "demo-access-disabled",
                        12
                    ),
                },
            },
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true,
            }
        );

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
        user: req.user.toAuthJSON(),
    });
};
