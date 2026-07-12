import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 80,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        password: {
            type: String,
            select: false,
        },
        avatar: {
            type: String,
            default: "",
        },
        authProvider: {
            type: String,
            enum: ["local", "demo"],
            default: "local",
        },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.toAuthJSON = function toAuthJSON() {
    return {
        id: this._id.toString(),
        name: this.name,
        email: this.email,
        avatar: this.avatar,
        authProvider: this.authProvider,
    };
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
