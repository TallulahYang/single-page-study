$(function() {
    $.getJSON("products.json", function(data) {

        products = data;
        generateAllProductsHTML(products);

        $(window).trigger('hashchange');
    });

    $(window).on('hashchange', function() {
        render(decodeURI(window.location.hash));
    });


    function generateAllProductsHTML(data) {

        var list = $('.all-products .products-list');

        var theTemplateScript = $("#products-template").html();
        //Compile the template​
        var theTemplate = Handlebars.compile(theTemplateScript);
        list.append(theTemplate(data));


        list.find('li').on('click', function(e) {
            e.preventDefault();

            var productIndex = $(this).data('index');

            window.location.hash = 'product/' + productIndex;
        })
    }

    function render(url) {

		var temp = url.split('/')[0];

		var	map = {

			'': function() {
				console.log('=====default====');
				renderProductsPage(products);
			},

			'#product': function() {
				var index = url.split('#product/')[1].trim();
				renderSingleProductPage(index, products);
			}

		};

		if(map[temp]){
			map[temp]();
		}
		else {
			//renderErrorPage();
		}

	}

	function renderSingleProductPage(index, data){

		var page = $('.single-product'),
			container = $('.preview-large');

		if(data.items.length){
			data.items.forEach(function (item) {
				if(item.title == index){

					container.find('h3').text(item.name);
					container.find('img').attr('src', item.lastImg);
					container.find('p').text(item.description);
				}
			});
		}
		page.addClass('visible');

	}

	function renderProductsPage(data){

		var page = $('.all-products'),
			allProducts = $('.all-products .products-list > li');

		allProducts.each(function () {

			var that = $(this);
			data.items.forEach(function (item) {
				if(that.data('index') == item.id){
					that.removeClass('hidden');
				}
			});
		});
		page.addClass('visible');
		singleProductPage.removeClass('visible');

	}

	var singleProductPage = $('.single-product');

	singleProductPage.on('click', function (e) {

		if (singleProductPage.hasClass('visible')) {

			var clicked = $(e.target);

			if (clicked.hasClass('close') || clicked.hasClass('overlay')) {
				window.location.hash='#';
			}

		}

	});

});