const mainImage = document.querySelector('.detail__container__left__img img');
const subImages = document.querySelectorAll('.detail__container__sub__img img');

subImages.forEach((image) => {
    image.addEventListener('click', () => {
        mainImage.setAttribute('src', image.getAttribute('src'));
    });
});

$(document).ready(function () {
    $('#btnAddSize').click(function () {
        let html = ``;
        html += `
        <div class="form-row">
            <div class="form-group col">
                <input id="pid" name="pid" placeholder="Mã sản phẩm"
                class="form-control" required type="text">
            </div>
            <div class="form-group col">
                <input id="sizes" name="sizes" placeholder="Size" class="form-control input-md" type="text">
            </div>
            <div class="form-group col">
                <input id="colors" name="colors" placeholder="Màu sắc" class="form-control input-md" type="text">
            </div>
            <div class="form-group col">
                <input id="prices" name="prices" placeholder="Giá gốc" class="form-control input-md" type="number" min="0">  
            </div>
            <div class="form-group col">
                <input id="discounts" name="discounts" placeholder="Giá khuyến mãi" class="form-control input-md" type="number" min="0">
            </div>
            <div class="form-group col">
                <input id="quantity" name="quantity" placeholder="Số lượng"
                class="form-control input-md w-100" required="" type="number" min="0">
            </div>
        </div>
        `;
        $('#sizeForm').append(html);
    });
});
