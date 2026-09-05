const errorHandler = (err, req, res, next) => {
    // Some SDKs (including Cloudinary) return plain error objects without a stack.
    console.error("API error:", err);

    const statusCode = err.statusCode || (err.name === "MulterError" ? 400 : 500);
    const message = err.message || err.error?.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message,
        ...(err.errors && { errors: err.errors }),
    });
};

module.exports = errorHandler;
