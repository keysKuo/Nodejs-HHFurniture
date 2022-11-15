const validators = {
    isAdmin: (req, res, next) => {
        if(req.session.user) {
            let username = req.session.user.username;
            let password = req.session.user.password;

            if(username == 'admin' && password == '123456') {
                req.role = 'admin';
                next();
            }else {
                req.flash('error', 'Bạn không có đủ quyền hạn truy cập');
                return res.redirect('/dang-nhap');
            }
        }else {
            return res.redirect('/dang-nhap');
        }
    }
}

module.exports = validators;