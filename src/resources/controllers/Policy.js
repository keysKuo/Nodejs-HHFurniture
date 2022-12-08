const { API_Policy } = require('../apis');
const createSlug = require('../utils/createSlug');
const ImageContent = require('../models/ImageContent');
const fileapis = require('../middlewares/fileapis');
const { lsCat, lsSubCat, policy } = require('../data/mock');
const Controller_Policy = {
    // [GET] /admin/policy/create
    GET_createPolicy: async (req, res, next) => {
        return res.render('pages/policy/create', {
            layout: 'admin',
            pageName: 'Tạo chính sách',
            error: req.flash('error') || '',
            success: req.flash('success') || '',
        });
    },

    // [POST] /admin/policy/create
    POST_createPolicy: async (req, res, next) => {
        const { title, content } = req.body;

        const slug = createSlug(title, {});

        let content_images = await uploadImageForContent();

        return await API_Policy.create({ ...req.body, content_images, slug })
            .then((policy) => {
                req.flash('success', 'Tạo chính sách thành công');
                return res.redirect('/admin/policy/storage');
            })
            .catch((err) => {
                req.flash('error', 'Tạo chính sách thất bại');
                return res.redirect('/admin/policy/create');
            });
    },

    // [GET] /admin/policy/delete/:id
    GET_deletePolicy: async (req, res, next) => {
        const id = req.params.id;

        return await API_Policy.remove(id)
            .then((policy) => {
                if (policy.content_images) {
                    for (path of policy.content_images) {
                        fileapis.deleteSync('./src/public' + path, (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                }

                req.flash('/success', 'Xoá chính sách thành công');
                return res.redirect('/admin/policy/storage');
            })
            .catch((err) => {
                req.flash('error', 'Xoá chính sách thất bại');
                return res.redirect('/admin/policy/storage');
            });
    },

    // [GET] /admin/policy/storage
    GET_policyStorage: async (req, res, next) => {
        let policies = await API_Policy.readMany({}, {});
        // console.log(policies);
        return res.render('pages/policy/storage', {
            layout: 'admin',
            pageName: 'Danh sách chính sách',
            data: policies,
            success: req.flash('success') || '',
            error: req.flash('error') || '',
        });
    },

    // [GET] /admin/policy/update/:id
    GET_policyUpdate: async (req, res, next) => {
        const id = req.params.id;

        let policy = await API_Policy.readOne({ _id: id });

        return res.render('pages/policy/update', {
            layout: 'admin',
            data: policy,
            success: req.flash('success') || '',
            error: req.flash('error') || '',
        });
    },

    // [POST] /admin/policy/update/:id
    POST_updatePolicy: async (req, res, next) => {
        const id = req.params.id;

        let content_images = await uploadImageForContent();

        return await API_Policy.update(id, { ...req.body })
            .then(async (policy) => {
                if (policy.content_images) {
                    policy.content_images = policy.content_images.concat(content_images);
                    await policy.save();
                }
                req.flash('success', 'Tạo chính sách thành công');
                return res.redirect('/admin/policy/storage');
            })
            .catch((err) => {
                req.flash('error', 'Tạo chính sách thất bại');
                return res.redirect('/admin/policy/create');
            });
    },

    //client controllers
};

async function uploadImageForContent() {
    let content_images = [];
    await ImageContent.find({})
        .lean()
        .then((images) => {
            images.forEach((img) => content_images.push(img.url));
        })
        .then(() => {
            ImageContent.deleteMany({}, (err) => {
                if (err) console.log(err);
            });
        })
        .catch((err) => {
            req.flash('error', 'Upload hình ảnh bài viết thất bại');
            return res.redirect(createURL);
        });
    return content_images;
}

module.exports = Controller_Policy;
