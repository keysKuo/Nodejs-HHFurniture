$(document).ready(function ($) {
    $('#addCart').click(() => {
        let pid = $('#pid').text();
        let quantity = $('#quantity').val();
        // alert('clicked');
        $.ajax({
            url: '/addCart',
            method: 'POST',
            data: { pid, quantity },
            success: (data) => {
                alert(data.msg);
            }
        })
    })

    $('.add-to-cart').click(function () {
        var id = $(this).data('id_product');
        var cart_product_id = $('.cart_product_id_' + id).val();
        var cart_product_name = $('.cart_product_name_' + id).val();
        var cart_product_image = $('.cart_product_image_' + id).val();
        var cart_product_price = $('.cart_product_price_' + id).val();
        var cart_product_qty = $('.cart_product_qty_' + id).val();
        var cart_product_stock = $('.cart_product_stock_' + id).val();
        var _token = $('input[name="_token"]').val();
        if (parseInt(cart_product_stock) > parseInt(cart_product_qty)) {
            $.ajax({
                url: '/lavarel%208/shop-vincent/add-cart-ajax',
                method: 'POST',
                data: {
                    cart_product_id: cart_product_id,
                    cart_product_name: cart_product_name,
                    cart_product_image: cart_product_image,
                    cart_product_price: cart_product_price,
                    cart_product_qty: cart_product_qty,
                    cart_product_stock: cart_product_stock,
                    _token: _token,
                },
                success: function () {
                    // swal(
                    //     {
                    //         title: 'Đã thêm sản phẩm vào giỏ hàng',
                    //         text: 'Bạn có thể mua hàng tiếp hoặc tới giỏ hàng để tiến hành thanh toán',
                    //         showCancelButton: true,
                    //         cancelButtonText: 'Xem tiếp',
                    //         confirmButtonClass: 'btn-success',
                    //         confirmButtonText: 'Đi đến giỏ hàng',
                    //         closeOnConfirm: false,
                    //     },
                    //     function () {
                    //         window.location.href = '/lavarel%208/shop-vincent/show-cart-page';
                    //     },
                    // );
                    alert('Success');
                },
            });
        } else {
            alert('Please buy lower than quantity in stock ' + cart_product_stock);
        }
    });

    $('.minus').click(function () {
        const id = $(this).data('product_id');
        let qtySold = $('.quantity_' + id).val();
        var value = parseInt(qtySold, 10);
        value = isNaN(value) ? 0 : value;
        if (value >= 1) {
            value--;
            $('.quantity_' + id).val(value);
        }
    });

    $('.plus').click(function () {
        const id = $(this).data('product_id');
        let qtySold = $('.quantity_' + id).val();
        var value = parseInt(qtySold, 10);
        value = isNaN(value) ? 0 : value;
        if (value < 10) {
            value++;
            $('.quantity_' + id).val(value);
        }
    });
});
// let shoppingCart;
// if (localStorage.getItem('shopping-cart')) {
//     shoppingCart = JSON.parse(localStorage.getItem('shopping-cart'));
// } else {
//     shoppingCart = JSON.parse(localStorage.setItem('shopping-cart', '[]'));
// }
// const bodyCart = document.getElementById('body-cart');
// const totalPrice = document.getElementById('total-cart');
// // renderProductToCart();
// // renderTotalPrice();

// function updateShoppingCart() {
//     localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
//     renderProductToCart();
//     renderTotalPrice();
// }
// function renderProductToCart() {
//     bodyCart.innerHTML = ``;
//     shoppingCart.forEach((item) => {
//         item = JSON.parse(item);
//         bodyCart.innerHTML += `<tr style="background-color: white" class="product-item">
//             <th scope="row">
//                 <a target="_blank" href="/products/${item.slug}">
//                     <div style="float: left"><img style="height: 130px; width: 130px" src="${item.img}" alt=""></div>

//                 </a>
//             </th>
//             <td><a  target="_blank" href="/products/${item.slug}">
//                     ${item.id}</a></td>
//             <td class="total-product-price"><strong>${Number(item.price).toLocaleString('vi', {
//                 style: 'currency',
//                 currency: 'VND',
//             })}</strong></td>
//             <td>
//                 <div class="units">
//                     <div class="btn minus" onclick="changeNumberOfUnit('minus', '${item.id}')">-</div>
//                     <div class="number">${item.numberOfUnit}</div>
//                     <div class="btn plus" onclick="changeNumberOfUnit('plus', '${item.id}')">+</div>
//                 </div>
//                 <input id="${item.id}" class="product-quantity w-25 pl-1 d-none" value="${
//             item.numberOfUnit
//         }" type="number">
//             </td>
//             <td><strong class="total-product">${Number(item.price * item.numberOfUnit).toLocaleString('vi', {
//                 style: 'currency',
//                 currency: 'VND',
//             })}</strong></td>
//             <td>
//                 <button onclick="deleteProduct('${item.id}')" class="btn btn-danger">
//                     <i class="fas fa-trash-alt"></i>
//                 </button>
//             </td>
//         </tr>`;
//     });
// }
// function deleteProduct(id) {
//     shoppingCart = shoppingCart.filter((item) => {
//         item = JSON.parse(item);
//         return item.id != id;
//     });
//     updateShoppingCart();
// }
// function renderTotalPrice() {
//     let total = 0;
//     shoppingCart.forEach((item) => {
//         item = JSON.parse(item);
//         total += item.numberOfUnit * item.price;
//     });
//     totalPrice.innerHTML = `TỔNG ĐƠN HÀNG ${total.toLocaleString('vi', { style: 'currency', currency: 'VND' })}`;
// }
// function changeNumberOfUnit(action, id) {
//     shoppingCart = shoppingCart.map((item) => {
//         item = JSON.parse(item);
//         let numberOfUnit = Number(item.numberOfUnit);
//         if (item.id === id) {
//             if (action == 'minus' && numberOfUnit > 1) {
//                 numberOfUnit--;
//             } else if (action == 'plus') {
//                 numberOfUnit++;
//             }
//         }
//         return JSON.stringify({
//             ...item,
//             numberOfUnit: numberOfUnit,
//         });
//     });
//     updateShoppingCart();
// }
// function showResult() {
//     let list = ``;
//     shoppingCart.forEach((item) => {
//         item = JSON.parse(item);
//         list += `
//                         <tr style="background-color: white" class="product-item">
//                             <th scope="row">
//                                 <a target="_blank" href="/products/${item.slug}">
//                                     <div style="float: left"><img style="height: 130px; width: 130px" src="${
//                                         item.img
//                                     }" alt="">
//                                     </div>
//                                 </a>
//                             </th>
//                             <td><a target="_blank" href="/products/${item.slug}">
//                                     ${item.id}</a></td>
//                             <td class="total-product-price"><strong>${Number(item.price).toLocaleString('vi', {
//                                 style: 'currency',
//                                 currency: 'VND',
//                             })}</strong></td>
//                             <td>
//                                 <div class="units">
//                                     <div class="number">${item.numberOfUnit}</div>
//                                 </div>
//                             </td>
//                             <td><strong class="total-product">${Number(item.price * item.numberOfUnit).toLocaleString(
//                                 'vi',
//                                 { style: 'currency', currency: 'VND' },
//                             )}</strong></td>
//                         </tr>
//             `;
//     });
//     document.getElementById('success-order').innerHTML = `
//         <div  class="success-order">
//             <div class="card">
//                 <div style=" background: #F8FAF5;">
//                     <img src="/img/logo2.png" alt="">
//                 </div>
//                 <h1>Bạn đã đặt hàng thành công</h1>
//                 <h2 class="mt-3 mb-3">Danh sách đơn hàng {{product_list}}</h2>
//                 <table class="table table-hover">
//                     <thead id="thead-cart">
//                         <tr>
//                             <th scope="col">Thông tin</th>
//                             <th scope="col">Mã sản phẩm</th>
//                             <th scope="col">Giá</th>
//                             <th scope="col">Số lượng</th>
//                             <th scope="col">Tổng giá</th>
//                         </tr>
//                     </thead>
//                     <tbody id="verify-order">
//                         ${list}
//                     </tbody>
//                     <tbody>
//                         <tr>
//                             <td id="total-order" colspan="6"><strong></strong></td>
//                         </tr>
//                     </tbody>
//                 </table>
//                 <a href="/collections/Lop-Advance-Samson-1" class="btn btn-info btn-lg mt-4">Tiếp tục mua hàng</a>
//             </div>
//         </div>
//         `;
//     let total = 0;
//     shoppingCart.forEach((item) => {
//         item = JSON.parse(item);
//         total += item.numberOfUnit * item.price;
//     });
//     document.getElementById('total-order').innerHTML = `TỔNG ĐƠN HÀNG ${total.toLocaleString('vi', {
//         style: 'currency',
//         currency: 'VND',
//     })}`;
// }
// function submitForm() {
//     // submits form
//     localStorage.removeItem('shopping-cart');
//     document.getElementById('form-shoppingCart').submit();
// }
// function submitFormCart() {
//     let total = 0;
//     shoppingCart.forEach((item) => {
//         item = JSON.parse(item);
//         total += item.numberOfUnit * item.price;
//     });
//     document.getElementById('product_list').value = JSON.stringify(shoppingCart);
//     document.getElementById('total').value = total;
//     showResult();
//     document.getElementById('form-shoppingCart').style.display = 'none';
//     setTimeout('submitForm()', 10000);
// }
