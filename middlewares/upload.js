const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "tmp");

const {CLIENT_MAX_BODY_SIZE=4000000} = process.env;


const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: multerConfig,
    limits: { fileSize: CLIENT_MAX_BODY_SIZE },
})

module.exports = upload;