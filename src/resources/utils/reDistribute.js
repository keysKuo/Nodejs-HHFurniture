function reDistribute(product) {
    let result = [];
    let pid = (typeof product.pid == 'string') ? [product.pid] : product.pid;
    let sizes = (typeof product.sizes == 'string') ? [product.sizes] : product.sizes;
    let colors = (typeof product.colors == 'string') ? [product.colors] : product.colors;
    let groups = new Set(sizes);

    groups.forEach((gr) => {
        let frame = {
            pid: [],
            colors: [],
            quantity: []
        };
        for (let i = 0; i < sizes.length; i++) {
            if (gr == sizes[i]) {
                let price = parseInt(product.prices[i]);
                let discount = parseInt(product.discounts[i]);
                let quan = parseInt(product.quantity[i]);

                let rate =
                    discount != 0 ? 100 - ((discount / price) * 100) : 0;

                frame.size = gr;
                frame.price = price;
                frame.discount = discount;
                frame.pid.push(pid[i]);
                frame.colors.push(colors[i]);
                frame.quantity.push(quan)
                frame.rate = parseInt(rate);
            }
        }
        result.push(frame);
    });
    return result;

}

module.exports = reDistribute;