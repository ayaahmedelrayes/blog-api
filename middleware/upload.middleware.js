const multer = require('multer');
const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// store file in memory temporarily
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadOnImageKit = async (req, res, next) => {
    try {
        if (!req.files || req.files.length === 0) return next();

        const uploadedImages = await Promise.all(
            req.files.map((file) =>
                imagekit.upload({
                    file: file.buffer,
                    fileName: file.originalname,
                    folder: '/blog-posts',
                })
            )
        );

        req.uploadedImages = uploadedImages.map((img) => img.url);
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = { upload, uploadOnImageKit };