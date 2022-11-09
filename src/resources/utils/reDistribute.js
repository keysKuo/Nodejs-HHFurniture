function reDistribute(product) {
    let groups = new Set(product.sizes);
    let result = [];

    groups.forEach((gr) => {
        let frame = {
            pid: [],
            colors: [],
            quantity: []
        };
        for (let i = 0; i < product.sizes.length; i++) {
            if (gr == product.sizes[i]) {
                let rate =
                    product.discounts[i] != 0 ? 100 - parseInt((product.discounts[i] / product.prices[i]) * 100) : 0;

                frame.size = gr;
                frame.price = product.prices[i];
                frame.discount = product.discounts[i];
                frame.pid.push(product.pid[i]);
                frame.colors.push(product.colors[i]);
                frame.quantity.push(parseInt(product.quantity[i]))
                frame.rate = rate;
            }
        }
        result.push(frame);
    });
    return result;

}

module.exports = reDistribute;