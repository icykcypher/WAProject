const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;
const authServerSecret = "smth";

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());


function validateToken(req, res, next) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Invalid Authorization header"
        });
    }
    const token = header.split(" ")[1];
    try {
        const decoded_token = jwt.verify(token, authServerSecret);
        if (decoded_token.iss !== "northauth") {
            return res.status(401).json({
                success: false,
                message: "Invalid issuer"
            });
        }

        if (decoded_token.aud !== "eshop-service") {
            return res.status(401).json({
                success: false,
                message: "audition is not eshop-service"
            });
        }
        request.capability = decoded_token;
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}

app.post("/api/buy-alcohol", validateToken, (req, res) => {
    const permissions = req.capability.permissions;

    if (!permissions.includes("buy_alcohol")) {
        return res.status(403).json({
            success: false,
            message: "A co jako! Je ti 18?!?"
        });
    }
    res.json({
        success: true,
        message: "permission given",
        user: req.capability.issuedForUser
    });
});

app.listen(PORT, () => {
    console.log(`Eshop server running on http://localhost:${PORT}`);
});
