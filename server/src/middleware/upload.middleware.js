const multer = require("multer");
const path = require("path");

const allowedImageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024, files: 5 },
    fileFilter: (req, file, callback) => {
        const extension = path.extname(file.originalname || "").toLowerCase();
        const isGenericImageUpload =
            file.mimetype === "application/octet-stream" &&
            allowedImageExtensions.has(extension);

        if (!file.mimetype.startsWith("image/") && !isGenericImageUpload) {
            const error = new Error("Only image files are allowed.");
            error.statusCode = 400;
            return callback(error);
        }

        callback(null, true);
    },
});

module.exports = upload;
