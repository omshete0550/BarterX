require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const connectDb = require("./config/db");
const initializeSocket = require("./socket/socket");
const { setSocketIo } = require("./utils/notification");

const PORT = process.env.PORT || 5000;
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const startServer = async () => {
    try {
        // Connect MongoDB
        await connectDb();

        // Create HTTP server using Express app
        const server = http.createServer(app);

        // Create Socket.IO server
        const io = new Server(server, {
            cors: {
                origin: allowedOrigins,
                methods: ["GET", "POST", "PUT", "DELETE"],
            },
        });

        app.set("io", io);
        setSocketIo(io);

        // Initialize Socket.IO
        initializeSocket(io);

        // Start server
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error.message);

        process.exit(1);
    }
};

startServer();
