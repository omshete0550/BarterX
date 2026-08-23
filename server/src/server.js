require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const connectDb = require("./config/db");
const initializeSocket = require("./socket/socket");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Connect MongoDB
        await connectDb();

        // Create HTTP server using Express app
        const server = http.createServer(app);

        // Create Socket.IO server
        const io = new Server(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST", "PUT", "DELETE"],
            },
        });

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
