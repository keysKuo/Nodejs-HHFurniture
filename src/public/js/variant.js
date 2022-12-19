$(document).ready(function () {
    var attributes = ['color', 'size'],
        $colorSelect = $('select[name="color"]'),
        $sizeSelect = $('select[name="size"]'),
        $variantSelect = $('select[name="purchasableId"]'),
        $variants = $variantSelect.find('option');

    VariantInit();

    function VariantInit() {
        // attach a selectChange event
        $.each(attributes, function (i) {
            if ($('select[name="' + attributes[i] + '"]').length > 0) {
                $('select[name="' + attributes[i] + '"]').on('change', function () {
                    console.log('ádvsd');
                    attributeChange();
                    selectVariant($colorSelect.val(), $sizeSelect.val());
                });
            }
        });
    }

    function attributeChange() {
        // reset attribute options
        $('select[name]').find('option').removeAttr('disabled');
        // get available options for each attribute
        $.each(attributes, function (i) {
            console.log('==================');
            $variants.removeAttr('disabled');
            // check available variants restricted by other attributes
            $.each(attributes, function (n) {
                // if not the same attribute and attribute value not empty
                if (i !== n && $('select[name="' + attributes[n] + '"]').val() !== '') {
                    // disable variants that not match the attributes-n
                    $variants.each(function () {
                        if ($(this).data(attributes[n]) !== $('select[name="' + attributes[n] + '"]').val()) {
                            $(this).attr('disabled', 'disabled');
                        }
                    });
                }

                // now collect all the available options for this attributes-i
                var availableOptions = [];
                $variants.each(function () {
                    if (!$(this).is(':disabled')) {
                        availableOptions.push($(this).data(attributes[i]));
                    }
                });

                // happily disable those unavailable options for attributes-i
                $('select[name="' + attributes[i] + '"]')
                    .find('option')
                    .each(function () {
                        var $opt = $(this);
                        if ($.inArray($opt.attr('value'), availableOptions) !== -1 || $opt.attr('value') === '') {
                            $opt.removeAttr('disabled');
                        } else {
                            $opt.attr('disabled', 'disabled');
                            console.log('disable ' + attributes[i] + ': ' + $opt.val());
                        }
                    });
            });
        });
    }

    function selectVariant(color, size) {
        var $selectedOption = null;

        $variants.each(function () {
            if (String($(this).data('color')) === color && String($(this).data('size')) === size) {
                $variantSelect.val($(this).attr('value'));
                $selectedOption = $(this);
            }
        });

        updatePrice($selectedOption);
    }

    function disableSoldOutOptions() {
        var $variants = $variantSelect.find('option');
        for (i = 0; i < attributes.length; ++i) {
            if ($('select[name="' + attributes[i] + '"]').length > 0) {
                $('select[name="' + attributes[i] + '"]')
                    .find('option')
                    .each(function () {
                        var $opt = $(this);
                        var found = false;

                        $variants.each(function () {
                            if (
                                $(this).data('out-of-stock') !== true &&
                                String($(this).data(attributes[i])) === $opt.val()
                            ) {
                                found = true;
                            }
                        });

                        if (!found) {
                            $opt.attr('disabled', 'disabled');
                        }
                    });
            }
        }
    }

    const formatCurrency = (price) => {
        if (price == 0) return 'Liên hệ';
        return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') + ' ₫';
    };
    function updatePrice($option) {
        $('.sku').text($option.data('sku'));
        $('.discount-price').addClass('d-none');
        $('.onsale-product-detail').addClass('d-none');
        if ($option.data('rate') > 0) {
            $('.rate').text('-' + $option.data('rate') + '%');
            $('.discount').text(formatCurrency($option.data('discount')));
            $('.discount-price ').removeClass('d-none');
            $('.onsale-product-detail').removeClass('d-none');
        }
        $('.gia-niem-yet').text(formatCurrency($option.data('price')));
    }
    if ($variantSelect.find(':selected').data('rate') <= 0) {
        $('.discount-price').addClass('d-none');
        $('.onsale-product-detail').addClass('d-none');
    }
    // Product variant
    let material;
    let color;
    let size;

    let currentSize = $('#sizeSelect').val();
    let currentColor = $('#colorSelect').val();
    let currentMaterial = $('#materialSelect').val();
    if ($('#variantProductSize li:first').data('size') == currentSize) {
        $('#variantProductSize li:first').addClass('ui-selected');
        $('#variantProductSize li:first').addClass('ui-selected');
    }

    if ($('#variantProductColor li:first').data('color') == currentColor) {
        $('#variantProductColor li:first').addClass('ui-selected');
        $('#variantProductColor li:first').addClass('ui-selected');
    }

    if ($('#variantProductMaterial li:first').data('material') == currentMaterial) {
        $('#variantProductMaterial li:first').addClass('ui-selected');
        $('#variantProductMaterial li:first').addClass('ui-selected');
    }
    $('#variantProductMaterial').selectable({
        selected: function () {
            $('.ui-selected', this).each(function () {
                material = $(this).data('material');
                console.log(material);
            });
        },
    });
    $('#variantProductColor').selectable({
        selected: function () {
            console.log(this);
            $('.ui-selected', this).each(function () {
                color = $(this).data('color');
                console.log(color);
            });
        },
    });
    $('#variantProductSize').selectable({
        selected: function () {
            $('.ui-selected', this).each(function () {
                size = $(this).data('size');
                $('#sizeSelect').val(size).change();
                currentSize = size;
            });
        },
    });
});
