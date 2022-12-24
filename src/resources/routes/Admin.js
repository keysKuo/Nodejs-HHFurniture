const express = require('express');
const router = express.Router();
const productRouter = require('./Products');
const newsRouter = require('./News');
const categoryRouter = require('./Category');
const policyRouter = require('./Policy');
const orderRouter = require('./Orders');

const { API_Category, API_Products } = require('../apis');
const fetch = require('node-fetch');

const { rollBackArr, getRelation } = require('../utils/categoryUtils');
const reDistribute = require('../utils/reDistribute');
// const userRouter = require('./User');

// Home
router.get('/', (req, res) => {
    return res.render('pages/admin', {
        layout: 'admin'
    });
})

// Products
router.use('/products', productRouter);

// Categories
router.use('/category', categoryRouter);

// News
router.use('/news', newsRouter);

// Policy
router.use('/policy', policyRouter);


// Order
router.use('/orders', orderRouter);

// Users
router.get('/user/logout', (req, res, next) => {
    req.session.destroy();
    return res.redirect('/dang-nhap');
})

router.get('/updateByExcel',async (req, res, next) => {
    await fetch(
        'https://opensheet.elk.sh/1tKCy3CrwUQP-WXscHNqbv7acOlAGagRFCfzgZc-Wvs0/Sheet1'
    ).then(result => {
        return result.json()
    }).then(async data => {
        let error = '';

        await data.forEach(async row => {
            let product = {
                pname: row['Tên sản phẩm'] || '',
                material: row['Chất liệu'] || '',
                pid: row['Mã sản phẩm'].split(',') || [],
                sizes: row['Kích thước'].split(',') || [],
                colors: row['Màu sắc'].split(',') || [],
                prices: row['Giá gốc'].split(',') || [],
                discounts: row['Giá khuyến mãi'].split(',') || [],
                quantity: row['Số lượng'].split(',') || [],
            }

            let n = product.pid.length;
            if (product.sizes.length != n || product.colors.length != n || product.prices.length != n || product.discounts.length != n) {
                console.log(product)
                error = 'Dữ liệu một số sản phẩm không hợp lệ';
                return;
            }

            let category =  row['Danh mục sản phẩm'] || '';
            let regex =  { $regex: category, $options: 'i' }
            
            product.categories = await API_Category.readOne({ name: regex }).then((category) => {
                if (category) {
                    return [getRelation(category)];
                }else {
                    return [];
                }  
            });
    
            product.classify = reDistribute(product);

            return await API_Products.updateByPID(product.pid, product)
                .then(async product => {
                    if(!product) {
                        await API_Products.create(product);
                    }
                })
                .catch(err => {
                    req.flash('error', error || err);
                    // return res.redirect('/admin/products/storage')
                })
        })

        if(error) {
            req.flash("error", error);
        }else {
            req.flash('success', 'Dữ liệu sản phẩm đã được cập nhật');
        }
        return res.redirect('/admin/products/storage');
        // return res.json(newProducts)
    })
});

router.get('/refreshData', async (req, res, next) => {
    let json = await API_Products.readMany()
        .then(products =>  {
            return products.map(p => {
                let classify = rollBackArr(p.classify);
                let categories = p.categories.map((c) => {
                    if(c) {
                        return c.level3.name;
                    }
                });
                return [
                    categories.toString(),
                    p.pname,
                    p.material,
                    p.pid.toString(),
                    classify.sizes.toString(),
                    classify.colors.toString(),
                    classify.prices.toString(),
                    classify.discounts.toString(),
                    classify.quantity.toString(),
                    
                ];           
            })
        })
    
    API_Products.updateSheet(json);
    return res.redirect('/admin/products/storage')
})

module.exports = router;