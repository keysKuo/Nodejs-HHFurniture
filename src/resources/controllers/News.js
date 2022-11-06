const { API_News } = require('../apis');
const createSlug = require('../utils/createSlug');
const fileapis = require('../middlewares/fileapis');
require('dotenv').config();
const BASE_URL = process.env.BASE_URL;
const { ImageContent } = require('../models');

// Urls
const storageURL = '/news/storage';
const createURL  = '/news/create';
const updateURL = '/news/update/';
const deleteURL = '/news/delete/';
const previewURL = '/news/preview/';

const Controller_News = {
    // [GET] /news
    GET_listNews: async (req, res, next) => {
        const page = parseInt(req.query.page) || 1;
        const options = {
            limit: 20,
            skip: 20 * (page - 1),
            select: {
                content: 0
            }
        }

        let listNews = await API_News.readMany({}, options);

        return res.render('pages/news', {
            layout: 'main',
            pageName: 'Tin tức và sự kiện',
            data: listNews,
            isLogin: req.session.user ? true : false
        })
    },

    // [GET] /news/detail/:slug
    GET_newsDetail: async (req, res, next) => {
        const slug = req.params.slug;
        
        let post = await API_News.readOne({slug});
        
        return res.render('pages/news/detail', {
            layout: 'main',
            pageName: post.title,
            data: post
        })
    },

    /*                                    Manager                                  */
    // [GET] /news/storage
    GET_managerNews: async (req, res, next) => {
        const page = parseInt(req.query.page) || 1;
        const options = {
            limit: 20,
            skip: 20 * (page - 1),
            select: {
                //content: 0
            } 
        }

        let listNews = await API_News.readMany({}, options);
        //console.log(listNews)
        return res.render('pages/news/storage', {
            layout: 'admin',
            pageName: 'Kho tin tức',
            data: listNews,
            isLogin: req.session.user ? true : false
        })
    },
    
    // [GET] /news/create
    GET_createNews: async (req, res, next) => {
        const error = req.flash('error') || '';
        const success = req.flash('success') || '';

        return res.render('pages/news/create', {
            layout: 'admin',
            pageName: 'Đăng tin tức',
            success, error
        })
    },

    // [POST] /news/create
    POST_createNews: async (req, res, next) => {
        const files = req.files;
        if(files.length == 0) {
            req.flash('error', 'Vui long nhap hinh anh');
            return res.redirect(createURL);
        }

        const slug = createSlug(req.body.title, {});

        let images = files.map(file => {
            return `/uploads/news/${slug}/${file.filename}`;
        } );
        
        let content_images = await uploadImageForContent();
        
        await API_News.create({...req.body, images, content_images, slug})
            .then(async post => {
                
                req.flash('success', 'Đăng bài viết thành công');
                return res.redirect(storageURL);
            })
            .catch(err => {
                fileapis.removeDirectory(BASE_URL + 'news/' + slug, (err) => {
                    console.log('Xóa thư mục thất bại: ' + err);
                });
                req.flash('error', 'Đăng bài viết thất bại: ' + err);
                return res.redirect(createURL);
            })
    },

    // [GET] /new/delete/:id
    GET_removeNews: async (req, res, next) => {
        const id = req.params.id;
        
        await API_News.remove(id)
            .then(post => {
                fileapis.removeDirectory(BASE_URL + 'news/' + post.slug, err => {
                    console.log('Xoá thư mục thất bại: ' + err);
                });

                for(path of post.content_images) {
                    fileapis.deleteSync('./src/public' + path, err => {
                        if(err) {
                            console.log(err);
                        }
                    })
                }

                req.flash('success', 'Xoá bài viết thành công');
                return res.redirect(storageURL);
            })
            .catch(err => {
                req.flash('error', 'Xoá bài viết thất bại: ' + err);
                return res.redirect(storageURL);
            })
    },

    // [GET] /news/update/:id
    GET_updateNews: async (req, res, next) => {
        const id = req.params.id;
        const error = req.flash('error') || '';
        const success = req.flash('success') || '';

        let post = await API_News.readOne({_id: id});
        
        return res.render('pages/news/update', {
            layout: 'admin',
            pageName: 'Chỉnh sửa bài viết',
            data: post,
            error, success
        })
    },

    // [POST] /news/update/:id
    POST_updateNews: async (req, res, next) => {
        const files = req.files;
        const oldPath = (typeof req.body.oldpath == 'string') ? [req.body.oldpath] : req.body.oldpath;
        const id = req.params.id;

        let isNewImg = files.length != 0;
        let images = (isNewImg) ? files.map(file => `/uploads/news/${req.body.slug}/${file.filename}`) : oldPath;
        
        let data = {
            ...req.body, images
        }

        await API_News.update(id, data)
            .then(post => {
                if(isNewImg) {
                    for(path of oldPath) {
                        fileapis.deleteSync('./src/public' + path, err => {
                            if (err)    console.log('Thư mục không tồn tại');
                        })
                    }
                }
                req.flash('success', 'Chỉnh sửa sản phẩm thành công');
                return res.redirect(storageURL);
            })
            .catch(err => {
                if(isNewImg) {
                    for(path of images) {
                        fileapis.deleteSync('./src/public' + ppath, err => {
                            if (err)    console.log('Thư mục không tồn tại');
                        })
                    }
                }

                req.flash('error', 'Chỉnh sửa sản phẩm thất bại');
                return res.redirect(updateURL + id);
            })
    },

    // [GET] /news/preview/:id
    GET_previewNews: async (req, res, next) => {
        const id = req.params.id;

        let post = await API_News.readOne({_id: id});

        return res.render('pages/news/preview', {
            layout: 'admin',
            pageName: post.title,
            prevPage: storageURL,
            data: post
        })
    }
    
}

async function uploadImageForContent() {
    let content_images = [];
    await ImageContent.find({}).lean()
            .then(images => {
                images.forEach(img => content_images.push(img.url));
            })
            .then(() => {
                ImageContent.deleteMany({}, err => {
                    if(err)
                        console.log(err);
                })
            })
            .catch(err => {
                req.flash('error', 'Upload hình ảnh bài viết thất bại');
                return res.redirect(createURL);
            })
    return content_images;
}

module.exports = Controller_News;