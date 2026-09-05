const Notification = require("../models/Notification");

let io;

const setSocketIo = (socketIo) => {
    io = socketIo;
};

const createNotification = async ({
    recipient,
    sender = null,
    type,
    title,
    message,
    barterRequest = null,
    product = null,
    rating = null,
}) => {
    const notification = await Notification.create({
        recipient,
        sender,
        type,
        title,
        message,
        barterRequest,
        product,
        rating,
    });

    io?.to(`user:${recipient}`).emit("notification_received", {
        notification,
    });

    return notification;
};

module.exports = {
    createNotification,
    setSocketIo,
};
