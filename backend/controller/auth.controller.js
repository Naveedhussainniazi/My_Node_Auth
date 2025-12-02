const User = require("../model/user.model");

// =============================
//      USER REGISTRATION
// =============================
module.exports.registration = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        const user = await User.create({ name, email, password });

        const { accessToken, refreshToken } = user.generateToken();

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            accessToken
        });

    } catch (err) {
        console.log("Registration Error:", err.message);
        return res.status(500).json({
            success: false,
            message: "Server Error in registration"
        });
    }
};


// =============================
//           LOGIN
// =============================
module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password required"
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const { accessToken, refreshToken } = user.generateToken();

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "User Login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            accessToken
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// =============================
//       REFRESH TOKEN
// =============================
module.exports.refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;  // FIXED

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "No refresh token found, please login"
            });
        }

        const user = await User.findOne({ refreshToken });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token, please login"
            });
        }

        const { accessToken } = user.generateToken();

        return res.status(200).json({
            success: true,
            message: "Access token refreshed successfully",
            accessToken
        });

    } catch (err) {
        console.log("Refresh error:", err);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// =============================
//            LOGOUT
// =============================
module.exports.logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "No refresh token found"
            });
        }

        const user = await User.findOne({ refreshToken });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token"
            });
        }

        user.refreshToken = null;
        await user.save();

        res.clearCookie("refreshToken");

        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// =============================
//          PROFILE
// =============================
module.exports.profile = async (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user
    });
};
