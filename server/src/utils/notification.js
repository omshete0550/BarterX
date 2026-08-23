const Notification = require("../models/Notification");

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
    return Notification.create({
        recipient,
        sender,
        type,
        title,
        message,
        barterRequest,
        product,
        rating,
    });
};

module.exports = {
    createNotification,
};
