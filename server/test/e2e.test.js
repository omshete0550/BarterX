require("dotenv").config();

const assert = require("node:assert/strict");
const { after, before, test } = require("node:test");

const enabled = process.env.RUN_E2E === "true";
const requiredVariables = [
    "E2E_MONGO_URI",
    "E2E_CLOUDINARY_CLOUD_NAME",
    "E2E_CLOUDINARY_API_KEY",
    "E2E_CLOUDINARY_API_SECRET",
];
const missingVariables = requiredVariables.filter((key) => !process.env[key]);

let server;
let request;
let socketIo;
let ioClient;
let mongoose;
let models;
let baseUrl;

const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const testEmail = (name) => `barterx-e2e-${name}-${unique}@example.test`;
const tinyPng = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScL9SAAAAABJRU5ErkJggg==",
    "base64",
);

before(async () => {
    if (!enabled || missingVariables.length) return;

    process.env.MONGO_URI = process.env.E2E_MONGO_URI;
    process.env.CLOUDINARY_CLOUD_NAME = process.env.E2E_CLOUDINARY_CLOUD_NAME;
    process.env.CLOUDINARY_API_KEY = process.env.E2E_CLOUDINARY_API_KEY;
    process.env.CLOUDINARY_API_SECRET = process.env.E2E_CLOUDINARY_API_SECRET;
    process.env.CLOUDINARY_UPLOAD_FOLDER = process.env.E2E_CLOUDINARY_FOLDER || "barterx/e2e";
    process.env.CLIENT_ORIGIN = "http://e2e.barterx.test";
    process.env.JWT_SECRET ||= "e2e-only-jwt-secret";

    const http = require("http");
    const supertest = require("supertest");
    const { Server } = require("socket.io");
    const app = require("../src/app");
    const connectDb = require("../src/config/db");
    const initializeSocket = require("../src/socket/socket");
    const { setSocketIo } = require("../src/utils/notification");

    mongoose = require("mongoose");
    await connectDb();
    server = http.createServer(app);
    socketIo = new Server(server, { cors: { origin: process.env.CLIENT_ORIGIN } });
    app.set("io", socketIo);
    setSocketIo(socketIo);
    initializeSocket(socketIo);
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    baseUrl = `http://127.0.0.1:${server.address().port}`;
    request = supertest(server);
    ioClient = require("socket.io-client").io;
    models = {
        User: require("../src/models/User"),
        Product: require("../src/models/Product"),
        BarterRequest: require("../src/models/BarterRequest"),
        Rating: require("../src/models/Rating"),
        Message: require("../src/models/Message"),
        Conversation: require("../src/models/Conversation"),
        Notification: require("../src/models/Notification"),
    };
});

after(async () => {
    if (!models) return;
    const users = await models.User.find({ email: { $regex: `barterx-e2e-.*${unique}` } }).select("_id");
    const userIds = users.map((user) => user._id);
    const products = await models.Product.find({ owner: { $in: userIds } }).select("_id");
    const productIds = products.map((product) => product._id);
    const barters = await models.BarterRequest.find({ $or: [{ requester: { $in: userIds } }, { receiver: { $in: userIds } }] }).select("_id");
    const barterIds = barters.map((barter) => barter._id);
    await Promise.all([
        models.Notification.deleteMany({ $or: [{ recipient: { $in: userIds } }, { sender: { $in: userIds } }] }),
        models.Rating.deleteMany({ barterRequest: { $in: barterIds } }),
        models.BarterRequest.deleteMany({ _id: { $in: barterIds } }),
        models.Message.deleteMany({ $or: [{ sender: { $in: userIds } }, { receiver: { $in: userIds } }] }),
        models.Conversation.deleteMany({ participants: { $in: userIds } }),
        models.Product.deleteMany({ _id: { $in: productIds } }),
        models.User.deleteMany({ _id: { $in: userIds } }),
    ]);
    await new Promise((resolve) => socketIo.close(resolve));
    await new Promise((resolve) => server.close(resolve));
    await mongoose.disconnect();
});

test("auth, uploads, wishlist, barter, ratings, chat, Socket.IO, and CORS", {
    skip: !enabled ? "Set RUN_E2E=true to run destructive integration tests." : missingVariables.length ? `Missing: ${missingVariables.join(", ")}` : false,
}, async () => {
    const register = async (name) => {
        const response = await request.post("/api/auth/register").send({ name, email: testEmail(name.toLowerCase()), password: "E2ePassword123!" }).expect(201);
        return response.body.data;
    };
    const alice = await register("Alice");
    const bob = await register("Bob");
    const auth = (token) => ({ Authorization: `Bearer ${token}` });

    const avatarUpdate = await request.put("/api/users/profile").set(auth(alice.token))
        .field("name", "Alice").attach("avatar", tinyPng, "avatar.png").expect(200);
    assert.match(avatarUpdate.body.data.user.avatar, /^https:\/\//);

    const corsResponse = await request.get("/api/products").set("Origin", process.env.CLIENT_ORIGIN).expect(200);
    assert.equal(corsResponse.headers["access-control-allow-origin"], process.env.CLIENT_ORIGIN);

    const bobSocket = ioClient(baseUrl, { auth: { token: bob.token }, transports: ["websocket"] });
    await new Promise((resolve, reject) => { bobSocket.once("connect", resolve); bobSocket.once("connect_error", reject); });

    const createProduct = async (user, title) => {
        const response = await request.post("/api/products").set(auth(user.token))
            .field("title", title).field("description", "A valid test listing description.")
            .field("category", "electronics").field("condition", "good").field("location", "Pune")
            .field("desiredProduct", "Another useful item").attach("images", tinyPng, "e2e.png").expect(201);
        assert.match(response.body.data.product.images[0], /^https:\/\//);
        return response.body.data.product;
    };
    const aliceProduct = await createProduct(alice, "Alice E2E Product");
    const bobProduct = await createProduct(bob, "Bob E2E Product");

    await request.post(`/api/wishlist/${bobProduct._id}`).set(auth(alice.token)).expect(200);
    const wishlist = await request.get("/api/wishlist").set(auth(alice.token)).expect(200);
    assert.equal(wishlist.body.data.wishlist[0]._id, bobProduct._id);

    const notificationPromise = new Promise((resolve) => bobSocket.once("notification_received", resolve));
    const barter = await request.post("/api/barter").set(auth(alice.token)).send({ requestedProduct: bobProduct._id, offeredProduct: aliceProduct._id, message: "Let's trade." }).expect(201);
    await notificationPromise;
    const barterId = barter.body.data.barterRequest._id;
    assert.ok(barter.body.data.barterRequest.conversation);
    await request.put(`/api/barter/${barterId}`).set(auth(bob.token)).send({ status: "accepted" }).expect(200);
    await request.put(`/api/barter/${barterId}/complete`).set(auth(alice.token)).expect(200);
    await request.post("/api/ratings").set(auth(alice.token)).send({ barterRequest: barterId, rating: 5, review: "Great exchange." }).expect(201);

    const messageEvent = new Promise((resolve) => bobSocket.once("new_message", resolve));
    const messageResponse = await request.post("/api/messages").set(auth(alice.token)).send({ receiver: bob.user.id, text: "Hello from the E2E suite." }).expect(201);
    await messageEvent;
    const conversations = await request.get("/api/conversations").set(auth(bob.token)).expect(200);
    const barterConversation = conversations.body.data.conversations.find((conversation) => conversation.barterRequest?._id === barterId);
    assert.equal(barterConversation.barterRequest.status, "completed");
    const conversationId = conversations.body.data.conversations.find((conversation) => conversation.lastMessage?._id === messageResponse.body.data.message._id)._id;
    const messages = await request.get(`/api/messages/${conversationId}`).set(auth(bob.token)).expect(200);
    assert.equal(messages.body.data.messages[0]._id, messageResponse.body.data.message._id);
    bobSocket.disconnect();
});
