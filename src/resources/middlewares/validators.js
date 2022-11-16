const fileapis = require('./fileapis');

const validators = {
    isAdmin: (req, res, next) => {
        if(req.session.isLogin) {
            req.role = 'admin';
            next();
        }else {
            return res.redirect('/dang-nhap');
        }
    },

    // Products
    VALIDATE_productCreate: (req, res, next) => {   
        let { pid, pname, material, feature, categories, sizes, colors, prices, discounts, quantity } = req.body;
        const files = req.files;

        pid = (typeof pid == 'string') ? [pid] : pid;
        sizes = (typeof sizes == 'string') ? [sizes] : sizes;
        colors = (typeof colors == 'string') ? [colors] : colors;
        prices = (typeof prices == 'string') ? [prices] : prices;
        discounts = (typeof discounts == 'string') ? [discounts] : discounts;
        quantity = (typeof quantity == 'string') ? [quantity] : quantity;

        if(pid.includes('') || sizes.includes('') || colors.includes('') 
        || prices.includes('') || discounts.includes('') || quantity.includes('')) {
            req.flash('error', 'Vui lòng nhập đầy đủ thông tin tất cả mã sản phẩm');
            fileapis.removeDirectory(req.folder, err => {
                console.log(err);
            })
            return res.redirect('/admin/products/create');
        }
        // fileapis.removeDirectory(req.folder, err => {
        //     console.log(err);
        // })
        let pdir = pid[0];
        let pimg = files.map((file) => {
            return `/uploads/products/${pdir}/${file.filename}`;
        });
        let cateList = categories.split(',').filter(cate => cate != '');
        req.docx = JSON.stringify({ pdir, pimg, pid, cateList, pname, material, feature, sizes, colors, prices, discounts, quantity });
        next();
    }
}

module.exports = validators;