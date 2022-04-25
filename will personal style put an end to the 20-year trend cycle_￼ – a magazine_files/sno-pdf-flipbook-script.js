jQuery(document).ready(function ($) {
	var flipbooks = $('.sample-docs');
	flipbooks.each(function() {
		if ($(this).closest('.pdf-full-content').length) {
			return;
		}
		var width = $(this).data('width');
		var aspect_ratio = $(this).data('aspect-ratio');
		console.log(width);
		$(this).turn({
				width: width - 62,
				height: (width - 62) / aspect_ratio,

				// Elevation
				elevation: 50,
				

				// Enable gradients

				gradients: false,
				
				// Auto center this flipbook

				autoCenter: true,

				turned: function(e, page, view) {

					var book = $(this);

					$('#slider').slider('value', getViewNumber(book, page));

					if (page!=1 && page!=book.turn('pages'))
						$('.sample-docs .tabs').fadeIn(500);
					else
						$('.sample-docs .tabs').hide();

					book.turn('center');
					updateTabs();

				},

				start: function(e, pageObj) {
				
					moveBar(true);

				},

				end: function(e, pageObj) {
				
					var book = $(this);

					setTimeout(function() {
						$('#slider').slider('value', getViewNumber(book));
					}, 1);

					moveBar(false);

				},

		});
		$(this).addClass('animated');
	});
	
	$('.sno-flipbook-arrow-left').click(function() {
		$(this).closest('.book-zoom').find('.sample-docs').turn('previous');
	});

	$('.sno-flipbook-arrow-right').click(function() {
		$(this).closest('.book-zoom').find('.sample-docs').turn('next');
	});

	$('#sno-pdf-flipbook-full').on('click', '.sno-flipbook-arrow-left', function() {
	    $('#sno-pdf-flipbook-full').find('.sample-docs').turn('previous');
	});

	$('#sno-pdf-flipbook-full').on('click', '.sno-flipbook-arrow-right', function() {
	    $('#sno-pdf-flipbook-full').find('.sample-docs').turn('next');
	});

	$('#sno-pdf-flipbook-full').on('click', '.close-flipbook', function() {
		$('#sno-pdf-flipbook-full').css('display', 'none');
	    $('#sno-pdf-flipbook-full').html("");
	    $('#wrap').removeClass('lockposition');
	});

	

	$('.sample-docs').click(function() {
		$('#wrap').addClass('lockposition');
		var content = $(this).closest('.canvas').find( ".pdf-full-content" ).html();
		$('#sno-pdf-flipbook-full').html(content);
		var flipbook_full = $('#sno-pdf-flipbook-full').find('.sample-docs');
		var aspect_ratio = $(this).data('aspect-ratio');
		
		var screen_width = $(window).width();
		var screen_height = $(window).height();
		var screen_ar = screen_width / screen_height;
                
        var flipbook_width = (screen_ar > aspect_ratio) ?  (($(window).height() - 60) * aspect_ratio) : ($(window).width() - 102);
        var flipbook_height = (screen_ar > aspect_ratio) ? ($(window).height() - 60) : (($(window).width() - 102) / aspect_ratio);
        
		flipbook_full.turn({
				width: flipbook_width,
				height: flipbook_height,

				// Elevation
				elevation: 50,
				

				// Enable gradients

				gradients: false,
				
				// Auto center this flipbook

				autoCenter: true,

				turned: function(e, page, view) {

					var book = $(this);

					$('#slider').slider('value', getViewNumber(book, page));

					if (page!=1 && page!=book.turn('pages'))
						$('.sample-docs .tabs').fadeIn(500);
					else
						$('.sample-docs .tabs').hide();

					book.turn('center');
					updateTabs();

				},

				start: function(e, pageObj) {
				
					moveBar(true);

				},

				end: function(e, pageObj) {
				
					var book = $(this);

					setTimeout(function() {
						$('#slider').slider('value', getViewNumber(book));
					}, 1);

					moveBar(false);

				},

		});
		flipbook_full.addClass('animated');
		$('#sno-pdf-flipbook-full').css('display', 'block');
	});

});