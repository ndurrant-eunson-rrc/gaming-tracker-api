import cors from "cors";

export const getCorsConfig = () => {
    const isDevelopment = process.env.NODE_ENV === "development";

    if (isDevelopment) {
        // Allow all origins in development for easy testing
        return cors({
            origin: true,
            credentials: true,
        });
    }

    // Strict origins in production
    return cors({
        origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    });
};