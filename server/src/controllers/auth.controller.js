import bcrypt from "bcrypt";
import User from "../models/User.js";
import { signAuthToken } from "../utils/jwt.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sendAuthResponse = (res, user, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        token: signAuthToken(user),
        user: user.toAuthJSON(),
    });
};

export const register = async (req, res) => {
    try {
        const name = String(req.body.name || "").trim();
        const email = String(req.body.email || "").trim().toLowerCase();
        const password = String(req.body.password || "");

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required",
            });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Enter a valid email address",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            authProvider: "local",
        });

        return sendAuthResponse(res, user, 201);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Unable to create account",
        });
    }
};

export const login = async (req, res) => {
    try {
        const email = String(req.body.email || "").trim().toLowerCase();
        const password = String(req.body.password || "");

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user || !user.password) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const passwordMatches = await bcrypt.compare(password, user.password);

        if (!passwordMatches) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        return sendAuthResponse(res, user);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Unable to sign in",
        });
    }
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
