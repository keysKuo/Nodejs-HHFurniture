const multer = require('multer');
const fileapis = require('./fileapis');
require('dotenv').config();
const BASE_URL = process.env.BASE_URL;
const { uuid } = require('uuidv4');
const createSlug = require('../utils/createSlug');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let pdir = (typeof req.body.pid == 'string') ? req.body.pid : req.body.pid[0];
        let path = BASE_URL + `${file.fieldname}/` + pdir;
        fileapis.createSync(path, err => {
            req.flash('error', 'Tạo thư mục thất bại');
        });
        cb(null, path);
    },

    filename: (req, file, cb) => {
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
        cb(null, uuid().substring(0,13) + ext);
    }
})

const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        let slug = createSlug(req.body.title, {});
        let path = BASE_URL + `${file.fieldname}/` + slug;
        fileapis.createSync(path, err => {
            req.flash('error', 'Tạo thư mục thất bại');
        });
        cb(null, path);
    },

    filename: (req, file, cb) => {
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
        cb(null, uuid().substring(0,13) + ext);
    }
})

const upload = multer({
    storage: storage,
    limits: { fieldSize: 2 * 1024 * 1024 }
})

const upload2 = multer({
    storage: storage2, 
    limits: { fieldSize: 2 * 1024 * 1024 }
})

module.exports = { upload, upload2 }