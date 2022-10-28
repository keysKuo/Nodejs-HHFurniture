const { API_News } = require('../apis');
const createSlug = require('../utils/createSlug');
const fileapis = require('../middlewares/fileapis');
const BASE_URL = process.env.BASE_URL;

const Controller_News = {
    // [GET] /news
    GET_listNews: async (req, res, next) => {
        const page = parseInt(req.query.page) || 1;
        const options = {
            limit: 20,
            skip: 20 * (page - 1),
        }

        const select = {
            description: 0
        }

        let listNews = await API_News.readMany({}, options, select)
        listNews.forEach(item => {
            item.createdAt = item.createdAt.toLocaleString('vi-vn');
        })

        return res.render('pages/news', {
            layout: 'main',
            pageName: 'Tin tức và sự kiện',
            data: listNews,
            isLogin: req.session.user ? true : false
        })
    }
}

module.exports = Controller_News;