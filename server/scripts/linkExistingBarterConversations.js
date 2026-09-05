require("dotenv").config();

const connectDb = require("../src/config/db");
const BarterRequest = require("../src/models/BarterRequest");
const Conversation = require("../src/models/Conversation");

async function migrate() {
    await connectDb();
    const requests = await BarterRequest.find({ conversation: null });

    for (const request of requests) {
        const conversation = await Conversation.create({
            participants: [request.requester, request.receiver],
            barterRequest: request._id,
        });
        request.conversation = conversation._id;
        await request.save();
    }

    console.log(`Linked ${requests.length} existing barter request(s) to conversations.`);
    process.exit(0);
}

migrate().catch((error) => {
    console.error("Migration failed:", error.message);
    process.exit(1);
});
