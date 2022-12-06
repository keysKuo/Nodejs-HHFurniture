const BASE_URL = process.env.BASE_URL;
const { API_Products } = require('../apis');
const { doitacs, introduce, lsCat, lsCartItem, lsSubCat, lsPost, posts, lsProduct } = require('../data/mock');

const Controller_Cart = {
    GET_CartPage: async (req, res, next) => {
        const product_list = req.session.product_list;
        const counter = req.session.counter;
        let n = (counter) ? counter.length : 0;
        const options = {
            select: { description: 0 },
        }

        let lsCartItem = [];
        let index;
        for (let i = 0; i < n; i++) {
            await API_Products.readOne({ pid: { $in: product_list[i] } }, options)
                .then(p => {
                    index = p.pid.findIndex(ip => ip == product_list[i]);
                    let curr = p.classify[index];
                    let product = {
                        productId: p.pid[index],
                        size: curr.size,
                        price: curr.price,
                        material: p.material,
                        color: curr.colors[0],
                        img: p.pimg[0], 
                        slug: p.slug
                    }
                    
                    lsCartItem.push({
                        product: product,
                        rate: curr.rate,
                        quantity: counter[i],
                        discount: curr.discount,
                        total: (curr.discount) ? curr.discount * counter[i] : curr.price * counter[i]
                    })
                })
        }
        
        const meta = { title: 'Giỏ hàng', desc: 'Trang chủ H&H Furniture', keywords: 'Homepage, đồ nội thất' };

        return res.render('pages/cart', {
            layout: 'main',
            template: 'khuyen-mai-template',
            meta,
            lsSubCat,
            lsCat,

            /// BE trả về
            lsCartItem, // done
            ///////
        });
    },
};

module.exports = Controller_Cart;
