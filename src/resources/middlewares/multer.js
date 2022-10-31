const multer = require('multer');
const fileapis = require('./fileapis');
require('dotenv').config();
const BASE_URL = process.env.BASE_URL;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let path = BASE_URL + req.body.pid;
        fileapis.createSync(path, err => {
            req.flash('error', 'Tạo thư mục thất bại');
        });
        cb(null, path);
    },

    filename: (req, file, cb) => {
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
        cb(null, file.fieldname + '_' + Date.now() + ext);
    }
})

module.exports = upload = multer({
    storage: storage,
    limits: { fieldSize: 2 * 1024 * 1024 }
})