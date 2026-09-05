const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (file, folder = "barterx/products") =>
    new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "image",
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
            },
        );

        stream.end(file.buffer);
    });

module.exports = uploadToCloudinary;

const deleteFromCloudinary = async (url) => {
    if (!url || !url.includes("res.cloudinary.com")) return;
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[^/.]+$/);
    if (!match) return;
    await cloudinary.uploader.destroy(match[1], { resource_type: "image" });
};

module.exports.deleteFromCloudinary = deleteFromCloudinary;
