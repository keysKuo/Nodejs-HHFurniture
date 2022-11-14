

const mainImage = document.querySelector('.detail__container__left__img img');
const subImages = document.querySelectorAll('.detail__container__sub__img img');

subImages.forEach((image) => {
    image.addEventListener('click', () => {
        mainImage.setAttribute('src', image.getAttribute('src'));
    });
});

$(document).ready(function () {
    $('.layer').hide();

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
            <div class="form-group">
                <div class="btn btn-danger btnDeleteSize"><i class="fa-solid fa-trash"></i></div>
            </div>
        </div>
        `;
        $('#sizeForm').append(html);
    });

    $(document).on('click', 'div.btnDeleteSize', function() {
        $(this).parent().parent().remove();
    })

    $('#level').on('change', function() {
        let level = parseInt($(this).val());
        
        switch(level) {
            case 1:
                $('.level1-box').hide();
                $('.level2-box').hide();
                break;
            case 2:
                $('.level1-box').show();
                $('.level1-box').removeClass('d-none');
                $('.level2-box').hide();
                break;
            case 3:
                $('.level1-box').show();
                $('.level1-box').removeClass('d-none');
                $('.level2-box').show();
                $('.level3-box').hide();
                break;
            default:
                $('.level1-box').hide();
                $('.level2-box').hide();
                $('.level3-box').hide();
                break;            
        }
    })

    $('#level1').on('change', function() {
        let level1_id = $(this).val();
        $('.delete-form').attr('action',`/category/delete/${level1_id}`)
        $('.level2-box').addClass('d-none');
        $('.level3-box').addClass('d-none');

        $('.layer').show();

        $.ajax({
            url: '/category/filter',
            method: 'POST',
            data: {
                level1_id
            },
            success: (data) => {
                
                $('.layer').hide();
                $('.level2-box').removeClass('d-none')
                $('#level2').html(data);
            },
            error: (request, error) => {
                $('.layer').hide();
                $('.level2-box').addClass('d-none')
            },
        })
        
    })

    $('#level2').on('change', function() {
        let level1_id = $(this).val();
        $('.delete-form').attr('action',`/category/delete/${level1_id}`)
        
        if(!level1_id) {
            let alt = $('#level1').val();
            $('.delete-form').attr('action',`/category/delete/${alt}`)
        }

        if(level1_id == '') {
            $('.level3-box').addClass('d-none');
        }

        $('.layer').show();

        $.ajax({
            url: '/category/filter',
            method: 'POST',
            data: {
                level1_id
            },
            success: (data) => {
                $('.layer').hide();
                $('.level3-box').removeClass('d-none')
                $('#level3').html(data);
            },
            error: (request, error) => {
                $('.layer').hide();
                $('.level3-box').addClass('d-none')
            },
        })
        
    })

    $('#level3').on('change',function() {
        let level1_id = $(this).val();
        if(!level1_id) {
            let alt = $('#level2').val();
            $('.delete-form').attr('action',`/category/delete/${alt}`)
        }
        $('.delete-form').attr('action',`/category/delete/${level1_id}`)
    })
});


