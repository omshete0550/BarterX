const { Blob } = require("buffer");

const createError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

const getMlServiceUrl = () => process.env.ML_SERVICE_URL?.replace(/\/$/, "");

const isMlServiceConfigured = () => Boolean(getMlServiceUrl());

const postImageToMlService = async (endpoint, file) => {
    const mlServiceUrl = getMlServiceUrl();

    if (!mlServiceUrl) {
        throw createError("Visual-search service is not configured.", 503);
    }

    if (!file?.buffer) {
        throw createError("An image file is required to generate an embedding.", 400);
    }

    const formData = new FormData();
    const imageBlob = new Blob([file.buffer], {
        type: file.mimetype || "application/octet-stream",
    });

    formData.append("image", imageBlob, file.originalname || "image.jpg");

    let response;

    try {
        response = await fetch(`${mlServiceUrl}${endpoint}`, {
            method: "POST",
            body: formData,
            signal: AbortSignal.timeout(30000),
        });
    } catch (error) {
        throw createError(
            `Unable to reach the visual-search service: ${error.message}`,
            503,
        );
    }

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw createError(
            payload.detail || payload.message || "The visual-search service could not process the image.",
            502,
        );
    }

    return payload;
};

const getImageEmbedding = async (file) => {
    const payload = await postImageToMlService("/embed", file);

    if (!Array.isArray(payload.embedding)) {
        throw createError("The visual-search service returned an invalid embedding.", 502);
    }

    return payload.embedding;
};

const classifyFashionImage = async (file) => {
    const payload = await postImageToMlService("/classify", file);
    const classification = payload.data;

    if (!classification?.category || typeof classification.confidence !== "number") {
        throw createError("The visual-search service returned an invalid classification.", 502);
    }

    return classification;
};

module.exports = {
    getImageEmbedding,
    classifyFashionImage,
    isMlServiceConfigured,
};
