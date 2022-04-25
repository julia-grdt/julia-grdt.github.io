// carousel adjustment for mobile
	jQuery(document).ready(function($) {
		if ( $(window).width() < 600 ) {
			$('.carousel-widget-slide-beside').width( $(window).width() - 20 );
		}
	});

// snoAds integration
	jQuery(document).ready(function( $ ) {
		if( $('.snoads_footerad').length ) {
			var ad_spot_id = $('.snoads_footerad').first().data('ad_spot_id');
	    	var ad_fill = $('.snoads_footerad').first().data('ad_fill');
	    	var sno_ads_id = $('.snoads_footerad').first().data('sno_ads_id');
	    	var url = 'https://snoads.com/api/v1/adspot/' + ad_spot_id + '/serve'
			jQuery.get(url, '', function(response) {
				if (response) {
					$('.footeradboardwrap .footerad').filter(':visible').html('<a target="_blank" href="' + response.link.link + '" class="sno-ad" data-ad-id="' + response.id + '"><img src="' + response.image.url + '" alt="Advertisement" /></a>');
				} else if (ad_fill) {
					$('.footeradboardwrap .footerad').filter(':visible').html('<img class="sno-fill-ad" src="' + ad_fill + '" alt="Advertisement"/>');
				} else {
					let rand_num = Math.floor((Math.random() * 3) + 1);
					$('.footeradboardwrap .footerad').filter(':visible').html('<img class="sno-fill-ad" src="https://snoads.s3.amazonaws.com/sno_ad_fill/728x90_' + rand_num + '.jpg" alt="Advertisement"/>');
				}
	        });
			$('.footerad').on('click', '.sno-ad', function() {
				let ad_id = $(this).data('ad-id');
				var url = 'https://snoads.com/api/v1/ad/' + ad_id + '/click';
				jQuery.post(url, '', function(response) {
		        });
			});
	
			$('.footerad').on('click', '.sno-fill-ad', function() {
				url = 'https://snoads.com/site/' + sno_ads_id;
				window.open(url, '_blank');
			});
		}
	});
	
	jQuery(document).ready(function( $ ) {

		if( $('.snoads_leaderboard').length ) {

			var ad_spot_id = $('.snoads_leaderboard').first().data('ad_spot_id');
	    	var ad_fill = $('.snoads_leaderboard').first().data('ad_fill');
	    	var sno_ads_id = $('.snoads_leaderboard').first().data('sno_ads_id');

	    	var url = 'https://snoads.com/api/v1/adspot/' + ad_spot_id + '/serve'
			jQuery.get(url, '', function(response) {
				if (response) {
					$('.leaderboardad').filter(':visible').html('<a target="_blank" href="' + response.link.link + '" class="sno-ad" data-ad-id="' + response.id + '"><img src="' + response.image.url + '" alt="Advertisement" /></a>');
				} else if (ad_fill) {
					$('.leaderboardad').filter(':visible').html('<img class="sno-fill-ad" src="' + ad_fill + '" alt="Advertisement" />');
				} else {
					let rand_num = Math.floor((Math.random() * 3) + 1);
					$('.leaderboardad').filter(':visible').html('<img class="sno-fill-ad" src="https://snoads.s3.amazonaws.com/sno_ad_fill/728x90_' + rand_num + '.jpg" alt="Advertisement"/>');
				}
	        });
			$('.leaderboardad').on('click', '.sno-ad', function() {
				let ad_id = $(this).data('ad-id');
				var url = 'https://snoads.com/api/v1/ad/' + ad_id + '/click';
				jQuery.post(url, '', function(response) {
		        });
			});
	
			$('.leaderboardad').on('click', '.sno-fill-ad', function() {
				url = 'https://snoads.com/site/' + sno_ads_id;
				window.open(url, '_blank');
			});
		}
	});


// scrollToFixed for header elements
jQuery(function($) {
	var fixed_element_adjustment = ( $('#wpadminbar').length && $('#wpadminbar').is(':visible') ) ? $('#wpadminbar').outerHeight() : 0;
	var stick_height = 0;
	$('.sno-header-row-stick:visible').each(function() {
		$(this).scrollToFixed({
			marginTop: fixed_element_adjustment + stick_height,
			spacerClass: 'topheaderspacer',
			zIndex: 2000
		});
		stick_height += $(this).height();
	});
	var bottom_stick_height = 0;
	$($('.footer .sno-footer-row-stick:visible').get().reverse()).each(function() {
		var row = this;
		$(this).scrollToFixed({ 
			bottom: bottom_stick_height, 
			limit: $(row).offset().top
		});
		bottom_stick_height += $(this).height();
	});
});

// If a draft is being displayed via query string, append all hyperlinks on the page with the query string to keep the user in the draft as they click through the site
jQuery(function($) {
	$(document).ready(function(){
		if ( $('.sno-viewing-draft-notice').length ) {
			$('a').each(function() {
				if( $(this).hasClass('draft-live') ) return;
				if( $(this).closest('#wpadminbar').length ) return;
				if( $(this).attr('href').indexOf( $('.sno-viewing-draft-notice').data('url') ) > 0 ) {
					$(this).attr('href', $(this).attr('href') + '?draft=' + $('.sno-viewing-draft-notice').data('draft-id') )
				}
			});
		}
	});
});

jQuery(function($){

	function hasNumber(myString) {
		return /\d/.test(myString);
	}
	
	
	// show teasers for selected menus on hover of category
	$('body').on('mouseenter', 'ul.menu-with-teasers .menu-item-object-category, ul.menu-with-teasers .menu-item-object-page', function() {
		
		var menu_object_id = '';
		$.each( $(this).attr('class').split(' '), function( index, value ) {
			if( /\d/.test(value) == true ) {
				menu_object_id = value.replace('menu-item-', '');
				return
			} 
		});
		
		if( menu_object_id == '' ) return;
		
		$('.menu-ta-inner').empty();
		$('.menu-ta-inner').hide();
		if( $(this).find('.menu-ta-inner').length ) {
			$(this).find('.menu-ta-inner').append($(this).closest('.sno-designer-area-container').find('.sub-menu-teaser-display-' + menu_object_id).clone().hide());
		} else {
			$(this).siblings('li').last().find('.menu-ta-inner').append($(this).closest('.sno-designer-area-container').find('.sub-menu-teaser-display-' + menu_object_id).clone().hide());
		}
		$('.menu-ta-inner').fadeIn('slow');
		$('.sub-menu .sub-menu-teaser-display-' + menu_object_id).fadeIn();
		$(this).find('img.scale').each(function() {
			var image_ratio = $(this).data('ratio');
			var width = 220; // this is an approximation
			var height = $(this).closest('.sno-story-card-photo-wrap').height();
			if (height != 0 && width != 0) {
				var area_ratio = (height/width).toFixed(2);
				if (Math.abs(image_ratio - area_ratio) < .25) $(this).css({'object-fit': 'cover'});
			}
		})
	});
		
	// adjust menu markup for menus that have teasers enabled
	function prepare_menus_with_teasers(menu) {
		
		// special adjustments for the More menu item
		$(menu).find('ul.menu-with-teasers').find('li.menu-more-item-top').find('ul.sub-menu').each(function() {
			$(this).closest('li').removeClass('menu-item-has-children');
			$(this).closest('li').find('a').removeClass('sf-with-ul');
			$(this).remove();
			
		})
// removing the ability for the More Menu to have category teasers display -- unless I can figure out how to have one of them display by default		
/*
		$(menu).find('ul.menu-with-teasers').find('ul.sno-hac-menu-more').each(function() {
			$('<li class="menu-ta-wrap"><div class="menu-ta"><div class="menu-ta-inner">Insertion Point</div></div><div class="clear"></div></li>').insertAfter($(this).find('li').last());
			$('.menu-teaser-insertion').replaceWith()
		});
*/
		$(menu).find('ul.menu-with-teasers > li.menu-item-object-category').find('ul.sub-menu').each(function() {
			if( $(this).find('li.menu-item-object-category').length || $(this).closest('li.menu-item-object-category').length ) {
				$(this).closest('li').addClass('sub-menu-teasers');
				$('<li class="menu-ta-wrap"><div class="menu-ta"><div class="menu-ta-inner"></div></div><div class="clear"></div></li>').insertAfter($(this).find('li').last());
			}
		});
		$(menu).find('ul.menu-with-teasers > li.menu-item-object-page').find('ul.sub-menu').each(function() {
			var menu_object_id = '';
			$.each( $(this).closest('li').attr('class').split(' '), function( index, value ) {				
				if( /\d/.test(value) == true ) {
					menu_object_id = value.replace('menu-item-', '');
					return
				} 
			});
			if( $(this).closest('.sno-designer-area-container').find('.sub-menu-teaser-display-' + menu_object_id).length < 1 ) return;
				$(this).closest('li').addClass('sub-menu-teasers');
				$('<li class="menu-ta-wrap"><div class="menu-ta"><div class="menu-ta-inner"></div></div><div class="clear"></div></li>').insertAfter($(this).find('li').last());
		});
		$(menu).find('ul.menu-with-teasers > li.menu-item-object-category, ul.menu-with-teasers > li.menu-item-object-page').each(function() {
			if( $(this).find('ul').length ) return;
			if( $(this).hasClass('menu-item-object-page') ) {
				var menu_object_id = '';
				$.each( $(this).attr('class').split(' '), function( index, value ) {
					if( /\d/.test(value) == true ) {
						menu_object_id = value.replace('menu-item-', '');
						return
					} 
				});
				if( $(this).closest('.sno-designer-area-container').find('.sub-menu-teaser-display-' + menu_object_id).length < 1 ) return;
			}
			$(this).addClass('sub-menu-teasers');
			$(this).append('<ul class="sub-menu"><li class="menu-ta-wrap"><div class="menu-ta-full"><div class="menu-ta-inner"></div></div><div class="clear"></div></li></ul>')
		});
	}
	
	// if menus have too many items in them, collapse the extras into an extra tab under "More"
	function hide_extra_menu_items(menu) {
						
		var max_width = $(menu).width();
		var total_width = 0;
		$(menu).find('ul.sf-menu > li').each(function() {
			total_width += $(this).outerWidth()
			total_width += 4;
			if( $(this).find('ul').length) {
				total_width += 12; // account for drop down arrows
			}
		});
							
		if( total_width > max_width ) {
			$(menu).find('ul.sno-menu-more').show();
			$(menu).find('ul.sno-hac-menu-more').show();
			var menu_ul_id = $(menu).find('ul').first().attr('id');
			var more_button_width = $(menu).find('li.menu-more-item-top').width()
			total_width += more_button_width;			

			$($(menu).find('ul.sf-menu > li').get().reverse()).each(function() {
				var li_width = $(this).outerWidth();
				$(this).addClass('sub-menu'); 
				$(this).prependTo($(menu).find('ul.sno-hac-menu-more'));
				total_width -= li_width;
				if( total_width + 15 < max_width ) return false; // the 15 is just an added buffer
			});
			
			$(menu).find('ul.sno-menu-more').addClass('sf-menu').superfish();
			$(menu).find('.menu-more-item-top').appendTo('#' + menu_ul_id);

		}
		
		$(menu).css({'overflow-y': 'unset'});
		
		if( $(window).width() > 800 ) prepare_menus_with_teasers(menu);
		
	}
	
	// hide extra menu items in the more tab on load
	$(document).ready(function(){
		$('.sno-hac-menuwrap, .sno-classic-menuwrap').each(function() {
			hide_extra_menu_items(this);
		});
	})
	
	// open up search bar when search icon is clicked
	$(document).ready(function() {
		$('body').on('click', '.sno-hac-search-icon', function() {
			$(this).find('i').toggleClass('fa-search fa-times')
			$('.sno-hac-hamburger-menu').hide();
			$('.sno-hac-search-icon-bar-' + $(this).data('id')).fadeToggle();
		});
	});

	// open up menu when hamburger icon is clicked
	$(document).ready(function() {
		$('body').on('click', '.sno-hac-menu-icon', function() {
		//	$(this).find('i').toggleClass('fa-bars fa-times')
			$('.sno-hac-search-icon-bar').hide();
			var menu = $('.sno-hac-hamburger-menu-' + $(this).data('menu-id'));
			menu.fadeToggle();
			if ($(window).width() > 800 && !$(this).hasClass('sno-hac-menu-side')) { 
				hide_extra_menu_items(menu);
			} else {
				$(menu).find('.sf-menu').superfish('destroy');

			}
		});
	});


	$('.sno-hac-menu-wrap li > a').on('click', function(e) { 
		if($(this).siblings('ul').length) {
			if( $(this).siblings('ul').is(':visible') ) {
			} else {
				$(this).siblings('ul').slideDown();
				$(this).addClass('sno-menu-expanded');
				e.preventDefault();
			}
		}
	});
	
	$('body').on('click', '.sno-hac-menu-mobile-close', function() {
		$(this).closest('.sno-hac-hamburger-menu').fadeOut();
	})
	
});

// news tickers for header area
jQuery(function($) {
	function marquee(a, b, speed, con_width) {
		var width = b.width();
 		var start_pos = con_width;
		var end_pos = -width;
	
		function scroll() {
			if ( b.position().left <= (-width + 1) ) {
				b.css('left', start_pos);
				scroll();
			} else {
				var min_width = ( width < con_width ) ? con_width : width;
				time = min_width / speed;
				b.animate({
					'left': -width
				}, time, 'linear', function() {
					scroll();
				});
			}
		}
	
		b.css({
			'width': width,
			'left': start_pos
		});
		scroll(a, b);
		
		// pause on hover
		b.mouseenter(function() { 
			b.stop();
			b.clearQueue();
		});
		b.mouseleave(function() {
			scroll(a, b);
		}); 
		
		// pause marquee when browser tab isn't visible to prevent excessive animations
		document.addEventListener('visibilitychange', function(ev) {
			if( document.visibilityState == 'hidden' ) {
				b.stop();
				b.clearQueue();
			} else {
				scroll(a, b);
			}
		});
	
	}

	$(document).ready(function() {
		$('.simple-marquee-container:visible').each(function(){
			if( $(this).data('activate') == true ) {
				if( $(this).find('.marquee-sibling').length ) {
					var marquee_width = $(this).width() - $(this).find('.marquee-sibling').width();
				} else {
					var marquee_width = $(this).width();
				}
				marquee($('.marquee'), $('.marquee-content-items'), $('.marquee').data('speed'), marquee_width ); 
			} else {
				var left_padding = $(this).find('.marquee-sibling').outerWidth() + 20;
				$(this).find('.marquee').css({'padding-left': left_padding + 'px' });
			}
			$(this).find('li').css('opacity', 1);
		});
	});

});


// staff profile adjust vertical text centering if text is too tall for area
jQuery(document).ready(function($) {
	if ($(window).width() > 600) {
		var staff_pic_height = $('.profile-panel-media img').height();
		if( staff_pic_height ) {
			var staff_text_height = $('.profile-textarea-inner').height();
			if( staff_pic_height < staff_text_height ) {
				$('.profile-textarea-with-media').removeClass('sno-center-v-outer');
				$('.profile-textarea-inner').removeClass('sno-center-v');
			}
		}
	}
	$('.sno-profile-fade').css({'position': 'relative'});
	$('.sno-profile-fade').animate({'opacity': 1, 'position': 'relative'});
});

// make photos and continue links clickable on category tile views
jQuery(document).ready(function() {
	jQuery('body').on('click', '.sno-tile-clickable', function() {
		var link = jQuery(this).find('a.homeheadline').attr('href');
		if( link ) { 
			window.location = link;
		} 
	});
	
	jQuery('body').on('click', '.sno-tile-clickable', function() {
		var photo = jQuery(this).find('a').data('photo-id');
		if( photo ) {
			jQuery.ajax({
				url: frontend_ajax_object.ajaxurl,
				type:'POST',
				data: {
					action: 'snoloadimage',
					photo: photo
				},
				success:function(results) {	
					jQuery('.remodal-inner-container').replaceWith(results);
					sno_slideshow_open = 'yes';
					var inst = jQuery("[data-remodal-id=modal-photo]").remodal();
					inst.open();
					scalephoto();
					
				}
			});
		}
		
	})
});


// building the staggered display of tiles for the category view pages
function place_tiles() {
	if (jQuery(window).width() < 980) {
		jQuery('.catpage-tiles-column.column-3').remove();
		jQuery('.catpage-tiles-column.column-2').remove();
	}
	if (jQuery(window).width() < 600) {
		jQuery('.catpage-tiles-column.column-1').remove();
	}
	jQuery('.sno-tile-hidden').each(function() {
		var shortest = [].reduce.call(jQuery(".catpage-tiles-column"), function(sml, cur) {
			return jQuery(sml).height() < jQuery(cur).height() ? sml : cur;
		});
		jQuery(this).removeClass('sno-tile-hidden').hide().appendTo(shortest).fadeIn();
	});
}

jQuery(window).load(function() {
	place_tiles();
});


// make sure that all story cards on the category tile view have the same height to create a nice, even display

function resize_tiles() {
	if (jQuery(window).width() > 600) {
		var height = 0; var tallest = 0; 
		var set_height = (jQuery('.sno-tile-resized').last().height() != null) ? jQuery('.sno-tile-resized').last().height() : null;
		jQuery('.catlist-tile').each(function() {
			if (!jQuery(this).hasClass('sno-tile-resized')) {
				height = jQuery(this).height();
				tallest = (height > tallest) ? height : tallest;
				if (set_height != null && tallest < set_height) tallest = set_height;
			}
		});
		if (jQuery('#staffpage').length) {
			if (tallest > 950) tallest = 950; // preventing runaway heights just in case someone adds something stupid
		} else {
			if (tallest > 750) tallest = 750; // preventing runaway heights just in case someone adds something stupid
		}
		jQuery('.catlist-tile').each(function() {
			if (!jQuery(this).hasClass('sno-tile-resized')) {
				jQuery(this).find('.catlist-tile-inner').height(tallest);
				if (jQuery(this).find('.catlist-tile-textarea').length) jQuery(this).find('.catlist-tile-textarea').addClass('sno-center-v-list');
				jQuery(this).addClass('sno-tile-resized');
			}
		});
	}
}


jQuery(window).load(function() {
	resize_tiles();
});


// force fill "contain" photo photos that are close to filling frame on category pages
function fill_photo() {
	jQuery('.catlist-panel-media img.unscaled').each(function() {
		jQuery(this).removeClass('unscaled');
		var image_ratio = jQuery(this).data('ratio');
		var width = jQuery(this).closest('.catlist-panel-media').width();
		var height = jQuery(this).closest('.catlist-panel-media').height();
		if (height != 0) {
			var area_ratio = (height/width).toFixed(2);
			if (Math.abs(image_ratio - area_ratio) < .15) jQuery(this).css({'object-fit': 'cover'});
		}
	})
	jQuery('.catlist-tile img.unscaled').each(function() {
		jQuery(this).removeClass('unscaled');
		var image_ratio = jQuery(this).data('ratio');
		var width = jQuery(this).closest('.catlist-tile-media-photo').width();
		var height = jQuery(this).closest('.catlist-tile-media-photo').height();
		if (height != 0) {
			var area_ratio = (height/width).toFixed(2);
			if (Math.abs(image_ratio - area_ratio) < .15) jQuery(this).css({'object-fit': 'cover'});
		}
	})
}
jQuery(document).ready(function($) {
	fill_photo();
});

// infinite scroll for category pages
jQuery(document).ready(function($) {
	jQuery('body').on('click', '.sno-infinite-scroll-button-active', function() {
		event.preventDefault();
		var paged = (jQuery(this).data('paged') == 0) ? 1 : jQuery(this).data('paged');
		var category = jQuery(this).data('category');
		var tag = jQuery(this).data('tag');
		var taxonomy = jQuery(this).data('taxonomy');
		var template = jQuery(this).data('template');
		var search = jQuery(this).data('search');
		var term = jQuery(this).data('term');
		var year = jQuery(this).data('year');
		var month = jQuery(this).data('month');
		
		var find_rendered = [];
		$('.profile-rendered').each(function() {
			find_rendered.push($(this).data('rendered'))
		});
		var rendered = find_rendered.join(',');

		jQuery('.sno-infinite-scroll-button').text($('#content').data('loading'));
			
		jQuery.ajax({
			url: frontend_ajax_object.ajaxurl,
			type:'POST',
			data: {
				'action': 'snoinfinite',
				'category': category,
				'tag': tag,
				'paged': paged,
				'template': template,
				'taxonomy': taxonomy,
				'search': search,
				'term': term,
				'year': year,
				'month': month,
				'rendered': rendered
			},
			success:function(results) {	
				jQuery('.sno-infinite-scroll-button').data('paged', paged + 1);
				jQuery(results).insertBefore('.sno-infinite-scroll-insertion');
				jQuery('.profile-keepalive').remove();
				jQuery('.sno-infinite-scroll-button').addClass('sno-infinite-scroll-button-active');
				place_tiles();
				fill_photo();
				resize_tiles();
				if (results == '') {
					jQuery('.sno-infinite-scroll-button').text($('#content').data('loaded'));
					jQuery('.sno-infinite-scroll-button').removeClass('sno-infinite-scroll-button-active');
				} else {
					jQuery('.sno-infinite-scroll-button').text($('#content').data('load'));
				}
			}
		});
	});
});

jQuery(window).on('scroll', function() {
	var scrollHeight = jQuery(document).height();
	var scrollPosition = jQuery(window).height() + jQuery(window).scrollTop();
	if (((scrollHeight - 300) >= scrollPosition) / scrollHeight == 0) {
		if (jQuery('.sno-infinite-scroll-button').hasClass('sno-infinite-scroll-button-active')) {
			jQuery('.sno-infinite-scroll-button-active').click();
			jQuery('.sno-infinite-scroll-button').removeClass('sno-infinite-scroll-button-active');
		}
	}
});



// make photos and continue links clickable on category views
jQuery(document).ready(function() {
	jQuery('.catlist-panel .continue, .catlist-panel img, a.catlist-photooverlay').click(function() {
		var link = jQuery(this).closest('.catlist-panel').find('a.homeheadline').attr('href');
		if( link ) { 
			window.location = link;
		} 

		var photo = jQuery(this).closest('.catlist-panel').find('a').data('photo-id');
		if( photo ) {
			jQuery.ajax({
				url: frontend_ajax_object.ajaxurl,
				type:'POST',
				data: {
					action: 'snoloadimage',
					photo: photo
				},
				success:function(results) {	
					jQuery('.remodal-inner-container').replaceWith(results);
					sno_slideshow_open = 'yes';
					var inst = jQuery("[data-remodal-id=modal-photo]").remodal();
					inst.open();
					scalephoto();
					
				}
			});
		}
		
	})


});

// when text is vertically centered on category list view, if the text area is taller than the photo, it won't look good. Expand the height of the text area to match its actual height
jQuery(window).load(function() {
	jQuery('.catlist-textarea-with-media').each(function() {
		var photo_height = jQuery(this).closest('.catlist-panel').find('.catlist-panel-media').height();
		var text_height = jQuery(this).height();
		if (text_height > photo_height) {
			jQuery(this).css({'position': 'unset', 'transform': 'unset', 'padding-top': 0, 'margin-right': '-15px' });
		}
	});
});
// do it again on ready just to be safe
jQuery(document).ready(function() {
	jQuery('.catlist-textarea-with-media').each(function() {
		var photo_height = jQuery(this).closest('.catlist-panel').find('.catlist-panel-media').height();
		var text_height = jQuery(this).height();
		if (text_height > photo_height) {
			jQuery(this).css({'position': 'unset', 'transform': 'unset' });
		}
	});
});

// make menu teaser photos clickable
jQuery(document).ready(function() {
	jQuery('body').on('click', '.sno-story-card-photo-wrap', function() {
		if (jQuery(this).closest('.sno-menu-card').find('a').length) {
			window.location=jQuery(this).closest('.sno-menu-card').find('a').attr('href');
		}
	});
});

// make full tag clickable
jQuery(document).ready(function() {
	jQuery('li.blockstag').click(function() {
		if (jQuery(this).find('a').length) {
			window.location=jQuery(this).find('a').attr('href');
		}
	});
});

// story list widget
jQuery(document).ready(function() {
	jQuery('.sno-story-card, .dual-format-card').click(function() {
		if (jQuery(this).find('a.homeheadline').length) {
			window.location=jQuery(this).find('a.homeheadline').attr('href');
		}
	});
});


// make sure that all story list cards in a horizontal row have the same height to create a nice, even display

jQuery(window).load(function() {
	
	jQuery('.list-horizontal').each(function() {
		var height = 0; var tallest = 0; 
		jQuery(this).find('.sno-story-card').each(function() {
			height = jQuery(this).height();
			tallest = (height > tallest) ? height : tallest;
		}); 
		if (jQuery(this).closest('.sno-story-list-widget').find('.story-widget-secondary').length) {
			var secondary_height = jQuery(this).closest('.sno-story-list-widget').find('.story-widget-secondary').height();
			tallest = (secondary_height > tallest) ? secondary_height : tallest;
		}
		jQuery(this).find('.sno-story-card').height(tallest);
	});

});

// parallax widget
jQuery(document).ready(function() {
	
	jQuery('.bcg').click(function() {
		window.location=jQuery(this).find('a').attr('href');
	});
	
	jQuery('.text-parallax').click(function() {
		window.location=jQuery(this).find('a').attr('href');
	});

	jQuery('.text-overlay-parallax-mobile').each(function() {
		var height = jQuery(this).height();
		var photoHeight = jQuery(this).closest('.parallax-mobile-widget-tile').find('img.parallax-mobile-image').height();
		var new_padding = Math.floor((photoHeight - height)/2); 
		jQuery(this).css('padding-top', new_padding);
	});
	
});

jQuery(window).load(function() {

	$body = jQuery('.parallaxcontainer');
	if (jQuery('.parallaxcontainer').is('.instantiate-parallax')) {
		var s = skrollr.init({
			forceHeight: false
		}); 
		jQuery(".parallaxcontainer").css('height','auto');
		jQuery(".parallaxcontainer section").fadeIn(2000);
		s.refresh(jQuery('.homeSlide'));
	}
	
});

// make sure that all trending stories cards in a horizontal row have the same height for photo and text to create a nice, even display

jQuery(window).load(function() {
	
	jQuery('.sno-widget-card-wrapper.trending-horizontal').each(function() {
		var height = 0; var tallest = 0; 
		
		jQuery(this).find('.sno-trending-card').each(function() {
			height = jQuery(this).height();
			tallest = (height > tallest) ? height : tallest;
		}); 
		jQuery(this).find('.sno-trending-card').height(tallest);
	});

});

// make sure that all trending stories cards are the same height

jQuery(window).load(function() {
	
	jQuery('.sno-widget-trending-wrapper.trending-horizontal').each(function() {
		
		var card_height = 0; 
		var tallest_card = 0;
		
		jQuery(this).find('.trending-row-wrap').each(function() {
			card_height = jQuery(this).height();
			tallest_card = (card_height > tallest_card) ? card_height : tallest_card;
		}); 
		jQuery(this).find('.trending-row-wrap').height(tallest_card);
	});

});

// make sure that all cards in a row have the same height for photo and text to create a nice, even display

jQuery(window).load(function() {
	
	jQuery('.sno-widget-card-wrapper.sno-card-row').each(function() {
		
		var title_height = 0; var teaser_height = 0;
		var tallest_title = 0; var tallest_teaser = 0;
		
		jQuery(this).find('.sno-content-card').each(function() {
			title_height = jQuery(this).find('.sno-profile-card-header-wrap').height();
			tallest_title = (title_height > tallest_title) ? title_height : tallest_title;
			teaser_height = jQuery(this).find('.sno-profile-card-teaser').height();
			tallest_teaser = (teaser_height > tallest_teaser) ? teaser_height : tallest_teaser;
		}); 
		jQuery(this).find('.sno-profile-card-header-wrap').height(tallest_title);
		jQuery(this).find('.sno-profile-card-teaser').height(tallest_teaser);
	});

});

// adjust the height of teasers so that text doesn't get cut off at the bottom of the widget

jQuery(document).ready(function() {
	jQuery('.sno-widget-card-wrapper.sno-card-row, .sno-widget-card-wrapper.sno-vertical-stack').each(function() {
		jQuery(this).find('.sno-content-card.sno-profile-small-photo').each(function() {
			var name_height = jQuery(this).find('.sno-profile-name').height();
			var title_height = jQuery(this).find('.sno-profile-title').height();
			var teaser_height = jQuery(this).find('p').height();
			var photo_height = jQuery(this).find('.sno-profile-card-image').height();
			var line_height = parseInt(jQuery(this).find('.sno-card-teaser p').css('line-height'));
			var font_size = parseInt(jQuery(this).find('.sno-card-teaser p').css('font-size'));
			var card_bottom_padding = parseInt(jQuery(this).css('padding-bottom'));
			
			var buffer = ( line_height - font_size ) / 2;
		
			if (photo_height != null) {
				var text_height_area_max = photo_height - name_height - title_height - 10 + card_bottom_padding;
				while (teaser_height >= text_height_area_max) teaser_height -= line_height;
				teaser_height += buffer;
			}
		});
		if (typeof(teaser_height) != "undefined" && teaser_height !== null) jQuery(this).find('.sno-profile-card-teaser').css({'height': teaser_height + 'px', 'overflow': 'hidden'});
	});
});

jQuery(document).ready(function() {
	// sports score hover effect for links
	jQuery('body').on('mouseenter', 'a .scorewrap.sc_horizontal', function() {
		jQuery(this).addClass('sc_score_link');
	});
	jQuery('body').on('mouseleave', 'a .scorewrap.sc_horizontal', function() {
		jQuery(this).removeClass('sc_score_link');
	});
	
	jQuery('body').on('mouseenter', 'a .scorewrap.sc_vertical', function() {
		jQuery(this).addClass('sc_score_link_vertical');
	});
	jQuery('body').on('mouseleave', 'a .scorewrap.sc_vertical', function() {
		jQuery(this).removeClass('sc_score_link_vertical');
	});
	
	// schedule/results widgets -- show dropdown choice for individual sports
	jQuery('body').on('click', '.scheduleheader', function() {
		jQuery(this).closest('.widgetwrap').find('.widget-sports-list').slideToggle();
		jQuery(this).closest('.widgetwrap').find('.sno-sports-selector-icon').toggleClass('dashicons-arrow-down dashicons-arrow-up');
	});
	
	// make table cells clickble on sports tables
	jQuery('table.schedulewidget td').click(function() {
		var href = jQuery(this).find("a").attr("href");
		if (href) {
			window.location = href;
		}
	});
})

jQuery(window).load(function() {
	
	// sports score carousel widget
	
	jQuery(function($) {
		
		$('.sports-widget-carousel').each(function(){

			var direction = $(this).data('direction');
			var transition_speed = $(this).data('transition-speed');
			var slide_duration = $(this).data('slide-duration');
			var pause_button = $(this).data('pause-button');
			var margin_width = $(this).data('margin-width');
			var item_width = $(this).data('item-width');
			var move_number = $(this).data('move-number');
			
			if (direction == 'vertical') {
				item_width = null;
				margin_width = null;
			}
			
			
			var carousel = $(this);
			$(this).flexslider({
				animationSpeed: transition_speed,
				slideshowSpeed: slide_duration,
				slideshow: true,
				animation: 'slide',
				direction: direction,
				directionNav: false,
				animationLoop: true,
				controlNav: false,
				pausePlay: pause_button,
				minItems: 1,
				move: 1,
				maxItems: 5,
				itemWidth: item_width,
				itemMargin: margin_width
			});
			
			$(this).find('.flex-viewport').css({'height': '200px!important'});
		});
	
	});
	

	// carousel widget -- instantiate flexslider for all carousel widgets
	
	jQuery(function($){
		
		$('.carousel-widget .carouselslider').each(function(){
			
			var transition_speed = $(this).data('transition-speed');
			var auto_scroll = $(this).data('auto-scroll');
			var transition_style = $(this).data('transition-style');
			var navigation_buttons = $(this).data('navigation-buttons');
			var width_adjustment = $(this).data('width-adjustment');
			var auto_scroll_speed = $(this).data('auto-scroll-speed');
			var display_number = $(this).data('display-number');
			var move_number = $(this).data('move-number');
			var margin_width = $(this).data('margin-width');
			var item_width = $(this).data('item-width');
			var show_thumbnails = $(this).data('show-thumbnails');
			var full_screen = $(this).data('full-screen');
			var thumbnail_width = $(this).data('thumbnail-width');
			var thumbnail_margin = $(this).data('thumbnail-margin');
			
			if (full_screen == 'widgetfullscreen' && display_number != '1') {
				item_width = (jQuery(window).width() - width_adjustment) / display_number;
			} else if (full_screen == 'widgetfullscreen') {
				item_width = jQuery(window).width();
			} else {
				item_width = ($(this).closest('.carouselslider').width() - width_adjustment) / display_number;
			}
			$(this).find('li.carousel-widget-slide').width( item_width );

			if (show_thumbnails == 'on') {
				jQuery(this).closest('.carousel-widget').find('.thumbnailslider').flexslider({
					animation: 'slide',
					customDirectionNav: jQuery(this).closest('.carousel-widget').find('.thumbnailslider .custom-navigation span'), 
					controlNav: false,
					directionNav: true,
					animationLoop: true,
					slideshow: false,
					itemWidth: thumbnail_width,
					itemMargin: thumbnail_margin,
					touch: true,
					asNavFor: $(this).closest('.carousel-widget').find('.carouselslider'),
				});
			}
			
			$(this).flexslider({
				animationSpeed: transition_speed,
				animationLoop: true,
				customDirectionNav: jQuery(this).find('.custom-navigation span'), 
			    controlNav: navigation_buttons,
				smoothHeight: false,
				slideshowSpeed: auto_scroll_speed,
				slideshow: auto_scroll,
				animation: transition_style,
				sync: $(this).closest('.carousel-widget').find('.thumbnailslider'),
				itemWidth: item_width,
				itemMargin: margin_width,
				minItems: 1,
				move: move_number,
				maxItems: 5,
			});
			
			var height_method = $(this).data('height-method');
			var height_ratio = $(this).data('height-ratio');

			var carouselWidth = jQuery(this).width()
			var carouselHeight = Math.floor(jQuery(this).width() * height_ratio / 100);
			
			if (height_method == 'Ratio') jQuery(this).find('ul.slides li').css('height', carouselHeight);
		
		});

	});
	
});

function scalephoto() {
	jQuery(".slideshow-photo-container").each(function(){
		photo_w = jQuery(this).find('img').attr('data-width');
		photo_h = jQuery(this).find('img').attr('data-height');
		if (photo_h > 0) { photo_ratio = photo_w / photo_h; } else { photo_ratio = 2; }
		area_w = jQuery(this).width();
		area_h = jQuery(this).height();
		if (area_h > 0) { area_ratio = area_w / area_h; } else { area_ratio = 2; }
		photo_ratio = photo_ratio.toFixed(2); area_ratio = area_ratio.toFixed(2);
		ratio_diff = Math.abs(area_ratio - photo_ratio).toFixed(2);
		if (ratio_diff < .3 && photo_w > area_w * .7 && photo_h > area_h * .7) {
			jQuery(this).find('img').addClass('forcefill');
		} else {
			jQuery(this).find('img').removeClass('forcefill');
		}
	})
}

jQuery(function() {
	window.onresize = function() {
		scalephoto();
		scalephotos();
    };
});

function scalephotos() {
	jQuery("#sfi-slideshow ul.slides li.storyslide").each(function(){
		photo_w = jQuery(this).find('img').attr('data-width');
		photo_h = jQuery(this).find('img').attr('data-height');
		if (photo_h > 0) { photo_ratio = photo_w / photo_h; } else { photo_ratio = 2; }
		area_w = jQuery(this).find('.sfi-photo-wrap').width();
		area_h = jQuery(this).find('.sfi-photo-wrap').height();
		if (area_h > 0) { area_ratio = area_w / area_h; } else { area_ratio = 2; }
		photo_ratio = photo_ratio.toFixed(2); area_ratio = area_ratio.toFixed(2);
		ratio_diff = Math.abs(area_ratio - photo_ratio).toFixed(2);
		if (ratio_diff < .3 && photo_w > area_w * .7 && photo_h > area_h * .7) {
			jQuery(this).find('img').addClass('forcefill');
		} else {
			jQuery(this).find('img').removeClass('forcefill');
		}
	})
}

jQuery(document).ready(function() {
	
	// functions for closing remodal windows on scroll down
	
	var sno_slideshow_open = 'no';
	jQuery('body').keypress(function(e){
		if(e.which == 27 || e.which == 0){
			sno_slideshow_open = 'no';
		}
	});									

	jQuery('html').on('wheel', function(event) {
		var delta = {
			y: event.originalEvent.deltaY
		};
					
	if (delta.y > 20 && sno_slideshow_open == 'yes') {
			jQuery('button.remodal-close').trigger('click');
			sno_slideshow_open = 'no';
		}
	});
	
	// for images set as the featured image
	
	jQuery('body').on('click', '.photooverlay, .photo-enlarge', function(){
		
		var photo = jQuery(this).data('photo-id');
		var story = jQuery(this).data('story-id');
		jQuery.ajax({
			url: frontend_ajax_object.ajaxurl,
			type:'POST',
			data: {
				action: 'snoloadimage',
				photo: photo,
				story: story
			},
			success:function(results) {	
				jQuery('.remodal-inner-container').replaceWith(results);
				sno_slideshow_open = 'yes';
				var inst = jQuery("[data-remodal-id=modal-photo]").remodal();
				inst.open();
				scalephoto();
				
			}
		});
	
	});


	// for images inserted into the body of the story
	
	jQuery('body').on('click', '.storycontent a', function(e){

		if (jQuery(this).find('img').length) {
			
			// test if the image is linked to something on current site vs. being linked to external site.  If linked externally, return true

			if (link_is_external(this)) {
   				return true;	
			} 
			
			function link_is_external(link_element) {
				return (link_element.host !== window.location.host);
			}
			
			var img_link = jQuery(this).attr('href');
			
			if (	img_link.indexOf(".jpg") === -1 && 
					img_link.indexOf(".jpeg") === -1 && 
					img_link.indexOf(".png") === -1 && 
					img_link.indexOf("attachment") === -1 
			) return true;
			
			var image_id = jQuery(this).find('img').attr('class').match(/[\w-]*wp-image-[\w-]*/g).toString().replace("wp-image-","");
			var post_id = jQuery(this).closest('div.snopostid').attr('id').toString().replace("snopostid-","");	
			
			jQuery.ajax({
               	url: frontend_ajax_object.ajaxurl,
				type: 'POST',
				data: {
					'action': 'snoloadimage',
					'photo': image_id,
					'story': post_id
				},
				success: function(results) {
					jQuery('.remodal-inner-container').replaceWith(results);
					sno_slideshow_open = 'yes';
					var inst = jQuery("[data-remodal-id=modal-photo]").remodal();
					inst.open();
					scalephoto();
				}
			});
    		
			return false;
		}		
	});

	// for SNO slideshows
	
	jQuery(".sfiphotowrap .slideshow-enlarge").click(function(){
		jQuery(this).closest(".sfiphotowrap").trigger('click');
	});

	jQuery('body').on('click', '.sfiphotowrap', function() {
		
		var image = jQuery(this).attr('data-photo-id');
		var storyid = jQuery(this).attr('data-story-id');
		var widget = jQuery(this).attr('data-widget');
		var photo_ids = jQuery(this).attr('data-photo-ids');
		var clicked_image = jQuery(this).find('li.flex-active-slide .inline-photo-wrap').data('image');
		if ( clicked_image == undefined ) var clicked_image = image;
		
						
		sno_slideshow_open = 'yes';
		jQuery('.remodal-inner-container').empty();
		var inst = jQuery("[data-remodal-id=modal-photo]").remodal();
		inst.open();
		
		jQuery.ajax({
			url: frontend_ajax_object.ajaxurl,
			type: 'POST',
			data: {
				'action': 'getslideshow',
				'storyid': storyid,
				'image': clicked_image,
				'photoids': photo_ids,
				'widget': widget
			},	
			success:function(results) { 
								
				jQuery('.remodal-inner-container').replaceWith(results);
				
				var start = jQuery('.remodal-inner-container').find('.slideshowdata').data('start');
				
				jQuery('.flexslider').animate({'opacity': 1}, { 'duration': 'slow'});
				jQuery('.flex-container').css('background', 'unset');

				jQuery('#sfi-thumbnails').flexslider({
					animation: 'slide',
					controlNav: false,
					customDirectionNav: jQuery("#sfi-thumbnav span"),
					animationLoop: true,
					slideshow: false,
					itemWidth: 106,
					itemMargin: 5,
					touch: true,
					asNavFor: '#sfi-slideshow'
				});

				jQuery('#sfi-slideshow').flexslider({
					animation: 'fade',
					smoothHeight: false,
					customDirectionNav: jQuery("#sfi-slideshow span"),
					animationLoop: true,
					slideshow: false,
					startAt: start,
					touch: true,
					sync: "#sfi-thumbnails"
				});
			
				var thumbAreaWidth = jQuery('#sfi-thumbnails').width();
				var thumbRowWidth = 111 * jQuery('#sfi-thumbnails li').length;
				if (thumbRowWidth < thumbAreaWidth) {
					jQuery('.sfi-thumbnails').width(thumbRowWidth);
				}
			
			
			}
			
		});
	
	});
	
	jQuery('body').on('click', 'div[data-remodal-action="close"]', function() {
		jQuery('button.remodal-close').trigger('click');
		sno_slideshow_open = 'no';
	});

	jQuery('body').on('click', 'button.sno-overlay-close', function() {
		sno_slideshow_open = 'no';
	});

  	// for inline slideshows in stories and widgets	
  	
	jQuery(function($){
		
		$('.inline-slideshow-area').each(function(){
			
			var smooth_height = $(this).find('.flex-container').data('smooth-height');
			var autoscroll_speed = $(this). find('.flex-container').data('autoscroll-speed');
			var autoscroll = $(this). find('.flex-container').data('autoscroll');
						
			$(this).find('.inline-thumbnails').flexslider({
				animation: 'slide',
				controlNav: false,
				customDirectionNav: $(this).closest('.inline-slideshow-area').find('.inline-thumbnav span'),
				animationLoop: true,
				slideshow: false,
				itemWidth: 107,
				itemMargin: 1,
				touch: true,
				asNavFor: $(this).closest('.inline-slideshow-area').find('.inline-slideshow')
			});
		
			$(this).find('.inline-slideshow').flexslider({
				animation: 'slide',
				smoothHeight: smooth_height,  
				controlNav: false,
				slideshowSpeed: autoscroll_speed, 
				slideshow: autoscroll,
				customDirectionNav: $(this).closest('.inline-slideshow-area').find('.inline-slideshow span'),
				animationLoop: true,
				touch: true,
				sync: $(this).closest('.inline-slideshow-area').find('.inline-thumbnails')
			});
			
			$(this).find('.custom-navigation').on('click', function() {
				return false;
			});

			var thumbAreaWidth = $(this).find('.inline-thumbnails').width();
			var thumbRowWidth = 111 * $(this).find('.inline-thumbnails li').length;
			if (thumbRowWidth < thumbAreaWidth) {
				$(this).find('.inline-thumbnails').width(thumbRowWidth);
			}

		});
		
	});	  		
	
	// activating modal window when sharing button clicked	
	
	jQuery('.modal-share').click(function() {
		if (jQuery(this).hasClass('share-email')) {
			var action = 'shareemail';
		} else {
			var action = 'sharestory';
		}
		var inst = jQuery('[data-remodal-id=modal-share]').remodal();
		inst.open();
	
		var sharestoryid = jQuery(this).find('.email-side-icon').data('story-id');
			
		jQuery.ajax({
			url: frontend_ajax_object.ajaxurl,
			type: 'POST',
			data: {
				'action': action,
				'sharestoryid': sharestoryid
			},
			success:function(results) { 
				
				jQuery(".remodal-share-inner-container").replaceWith(results); 
				
				setTimeout(function(){ 
					jQuery('input#human').after('<div class="sno-email-captcha">Are you a robot or a human? <div class="sno-email-captcha-button sno-email-robot" role="button" aria-pressed="false" tabindex="0"><i class="fas fa-robot"></i><span class="icon-hidden-text">Robot</span></div><div class="sno-captcha-button sno-email-human" role="button" aria-pressed="false" tabindex="0"><i class="fas fa-user"></i><span class="icon-hidden-text">Human</span></button></div>');
				}, 6000);

				jQuery('body').on('blur focus keypress paste', '.emailstoryform form input', function() {
					if ( jQuery( ".sno-email-captcha" ).is( ":hidden" ) && jQuery( "button#submit_email" ).is( ':disabled' ) ) jQuery('.sno-email-captcha').slideDown();
				});
				
				
			}
		});
	
	});
	
	// when readers share stories via email

	jQuery(function($){

		$('body').on('click', '.sno-email-captcha-button', function(event, wasTriggered) {
		    if (wasTriggered) {
		        email_robot_click();
		    } 
		});

		$('body').on('click', '.sno-email-robot', function() {
			email_robot_click();
		});
		
		function email_robot_click() {
			$('.emailstoryform form button#submit_email').slideUp('slow');
			setTimeout( function() {
				$('.emailstoryform form button#submit_email').remove();
				$('.sno-email-captcha').html('Sorry, only humans are allowed to send email.');
			}, 1000);
		}
		
		$('body').on('click', '.sno-email-human', function() {
			var r = $('input#wp-remember-email');
			$('.sno-email-captcha').slideUp();
			$('.emailstoryform form button#submit_email').prop( 'disabled', false );
			setTimeout( function() {
				$('.sno-comment-captcha').remove();
				r.val('1\u200B');
			}, 400);
		});

		$('body').on('focus', '.emailstoryform form input#human', function() {
			set_email_spam_verification();
			
		});
		
		function set_email_spam_verification() {
						
			var z = $('.sno-email-data').data();
			$.each( z, function( x, y ) {
				$('.sno-email-data').removeAttr('data-' + x);
			});
			
			$('input#sno-email-verification').attr('value','');
			$.each( z, function( a, b ) {
				a += ' '; b += ' ';
				$.each( a.split(''), function( c, d ) {
					$('input.sno-email-verification').attr('value', $('input.sno-email-verification').val() + d + b.split('')[c])	
				})
			})
			$('input#sno-email-verification').attr('name', 'sno-email-verifyaction');

		}

		$("body").on('input', '.emailstoryform #email_from', function() {
			var val = $(this).val();
		    var regexname = /^([a-zA-Z0-9 .@]{1,40})$/;
			if (!val.match(regexname)) {
				$(this).addClass('invalid-input');
			} else {
				$(this).removeClass('invalid-input');
			}
		});

		$("body").on('input', '.emailstoryform #email_to', function() {
			var val = $(this).val();
			var email_pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
			if (val.match(email_pattern)) {
				$(this).removeClass('invalid-input');
			}
		});

		$('body').on('click','#submit_email',function(e){
						
		    var email_from_valid = /^([a-zA-Z0-9 .@]{1,40})$/;

			if (!$('.emailstoryform #email_from').val().match(email_from_valid)) {
				return;
			} 

			var email_pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
			if (!$('.emailstoryform #email_to').val().match(email_pattern)) {
				$('.emailstoryform #email_to').addClass('invalid-input')
				return;
			} 

			var storyid = $(this).closest('.emailstoryform').data('story-id');
			var humanity = $(this).closest('.emailstoryform').data('humanity');
			var form_data = $(this).closest('form').serializeArray();
						
			$.ajax({
				url: frontend_ajax_object.ajaxurl,
				type:'POST',
				data: {
					'action': 'emailstory',
					'storyid': storyid,
					'humanity': humanity,
					'form_data': form_data
				},
	            success: function(results) { 
		            $(".remodal-share-inner-container").replaceWith(results); 
				}
    	  	});
		});

	});
										
					

	// staff page links

	jQuery('tr.staffstoryrow').click(function() {
		var href = jQuery(this).find("a").attr("href");
		if(href) {
			window.location = href;
		}
	});
	
	jQuery('.clickable-row').click(function() {
		window.document.location = jQuery(this).data('href');
	});
	
	
	// grid widget -- hover and photo effects
	
	jQuery('.enlarge-effect').mouseenter(function() {
		jQuery(this).find('img').removeClass('shrink');
		jQuery(this).find('img').removeClass('grow');
		jQuery(this).find('img').addClass('grow');
	});
	jQuery('.enlarge-effect').mouseleave(function() {
		jQuery(this).find('img').addClass('shrink');
	});

	jQuery('.overlay-hover').mouseenter(function() {
		jQuery(this).find('.gridwidgetoverlay').fadeIn();
	});
	jQuery('.overlay-hover').mouseleave(function() {
		jQuery(this).find('.gridwidgetoverlay').fadeOut();
	})
		
	jQuery('.keep-link').click(function() {
		window.location=jQuery(this).find('a').attr('href');
	});

	
	// carousel widget effects

	jQuery('.carousel-cover-hover').mouseenter(function() {
		jQuery(this).find('.carouseloverlay').fadeIn();
		jQuery(this).find('.carouseloverlaytext').fadeIn();
	});
	jQuery('.carousel-cover-hover').mouseleave(function() {
		jQuery(this).find('.carouseloverlay').fadeOut();
		jQuery(this).find('.carouseloverlaytext').fadeOut();
	})

	jQuery('.carouseltext .continue').click(function() {
		window.location=jQuery(this).parent().find('a').attr('href');
	});
	
	jQuery('.carousel-cover-hover').click(function() {
		window.location=jQuery(this).find('.widgetheadlineoverlay a').attr('href');
	});

	
	// category widget
	jQuery('body').on('mouseenter', 'img.enlarge-effect', function() {
		jQuery(this).removeClass('shrink');
		jQuery(this).removeClass('grow');
		jQuery(this).addClass('grow');
	});
	jQuery('body').on('mouseleave', 'img.enlarge-effect', function() {
		jQuery(this).addClass('shrink');
	});

	jQuery('.fw1-textarea .continue').click(function() {
		window.location=jQuery(this).closest('.fw1-panel').find('.widgetheadline a').attr('href');
	});

	jQuery('.fw2-textarea .continue').click(function() {
		window.location=jQuery(this).closest('.fw2-panel').find('.widgetheadline a').attr('href');
	});

	jQuery('.fw3-textarea .continue').click(function() {
		window.location=jQuery(this).closest('.fw3-panel').find('.widgetheadline a').attr('href');
	});

	jQuery('.wa-textarea .continue').click(function() {
		window.location=jQuery(this).closest('.wa-textarea').find('a.homeheadline').attr('href');
	});
	
	jQuery('.catwidget-col2 .continue').click(function() {
		window.location=jQuery(this).closest('.catwidget-col2').find('a.homeheadline').attr('href');
	});
	
		
	// go to top button on long form pages

	jQuery('#gototop').click(function () {
		var bottomPosition = jQuery(".phototop").height();
		var bottomWindow = jQuery(window).height();
		bottomWindow = bottomWindow - 50;
		if (bottomWindow < bottomPosition) {
			photoHeight = bottomWindow;
			photoHeight = photoHeight -45;
		} else {
			photoHeight = bottomPosition +35;
		}
		jQuery('html, body').animate({
			scrollTop: jQuery("#mainbody").offset().top-photoHeight
     	}, 1000).delay();
		return false;
	});

	// side menus on long form pages

	jQuery("#hover-menu").click(function(){
	    jQuery("#altheader-searchbox").toggle('slow');					
	});  

	if (jQuery('.slidemenu').is(":visible")) {
		jQuery('.hidethis').css({ visibility: "hidden" });
		jQuery('#altheader-searchbox').css({ zIndex: "1001"});
	} else {
		jQuery('.hidethis').css({ visibility: "visible" });
		jQuery('#altheader-searchbox').css({ zIndex: "99"});
	}

	jQuery('.sno-menu').click(function() {
	
		jQuery('#hoverbar_menu').fadeToggle();
		jQuery('.menu-icon').toggle();
		jQuery('.close-icon').toggle();
		jQuery('#hoverbar_menu').css({ height: jQuery(window).height() - 50 });
	
	});
	
	// comments box and links on story pages
	
	jQuery("#commentsbox").click(function() {
    	jQuery("#commentsbody").slideToggle('slow');
    	jQuery(".commenttoggle").toggleClass("fa-plus-square fa-minus-square");
    	if (jQuery(".commenttoggle").hasClass("fa-plus-square")) {
			jQuery(".commenttoggle").attr("aria-expanded", "false");
		} else {
			jQuery(".commenttoggle").attr("aria-expanded", "true");
	    }
	});
	
/*
	jQuery("#commentslink, .commentscroll").click(function() {
    	jQuery("#commentsbody").slideDown('slow');
    	jQuery(".commenttoggle").addClass("fa-minus-square").removeClass("fa-plus-square").attr("aria-expanded", "true");
	});
*/

/*
	jQuery(function($) {
		$('.commentscroll').click(function() {
			var adjustment = 70; // set up a top margin for the scrolled-to element
			if ($(".navbarwrap").hasClass('sno-sticky')) {
				adjustment += jQuery('.navbarwrap').height();
			}
			if ($(".subnavbarwrap").hasClass('sno-sticky')) {
				adjustment += jQuery('.subnavbarwrap').height();
			}
			$('html, body').animate({ scrollTop: $("#commentswrap").offset().top - adjustment }, 500);
			return false;
		});
	});
*/
	
	// WordPress automatically adjusts widths on left and right floated photos with captions.  It's annoying.  Let's readjust their adjustment. 

	jQuery(document).ready(function(){
		// jQuery(".wp-caption").removeAttr('style');
		jQuery.each(jQuery(".wp-caption"), function(){
			jQuery(this).width(jQuery(this).find('img').attr('width'));
		});
	})
	
	// activate search button on focus within the search box
	
	jQuery(function(){
		jQuery(".s").focus(function(){
			jQuery(".sno-submit-search-button").prop("disabled", false);
		});				
	});
	
	// Accessibility -- Set tabIndex to -1 so that top_level_links can't receive focus until menu is open
	
    var top_level_links = jQuery(".sf-menu").find('> li > a');
    jQuery(top_level_links).next('ul')
        .find('a')
            .attr('tabIndex',-1);

    // Accessibility -- Adding aria-haspopup for appropriate items
    
    jQuery(top_level_links).each(function(){
        if(jQuery(this).next('ul').length > 0)
            jQuery(this).parent('li').attr('aria-haspopup', 'true');
    });
    
    // Side menu on mobile view
   
 	jQuery( '#hover-menu-side' ).on( 'touchstart click', function(e) {
 		e.preventDefault();
 			jQuery('#sno_mobile_menu').fadeToggle();
		    jQuery("body").toggleClass('noscroll');

 	});
 	
 	jQuery( '.side-close-icon' ).on( 'touchstart click', function(e) {
 		e.preventDefault();
 			jQuery('#sno_mobile_menu').fadeToggle();
			    jQuery("body").toggleClass('noscroll');
 	});
 		

 	// Slideshows and photos need to open in remodal overlays -- prevent them from going to a new URL or jumping to anchor
 	
	jQuery("a[href='#slideshow']").on('click', function(event) { return false; });
//	jQuery("a[href='#photo']").on('click', function(event) { return false; });

	// Create photo slide up effect as the reader scrolls down the page
	
	var win = jQuery(window);
	var allMods = jQuery(".sno-animate-active .sno-animate");
	var allWPcaptions = jQuery(".sno-animate-active .wp-caption");

	allMods.each(function(i, el) {
		var el = jQuery(el);
		if (el.visible(true)) {
			el.addClass("already-visible"); 
		} else {
			el.css('visibility', 'hidden');
		}
	});
	allWPcaptions.each(function(i, el) {
		var el = jQuery(el);
		if (el.visible(true)) {
			el.addClass("already-visible"); 
		} 
	});

	jQuery(window).scroll(function(event) {
		jQuery(".sno-animate-active .sno-animate").each(function(i, el) {
			var el = jQuery(el);
			if (el.visible(true)) {
				el.addClass("come-in");
				el.css('visibility', 'visible');
			}
		});
		jQuery(".sno-animate-active .wp-caption").each(function(i, el) {
			var el = jQuery(el);
			if (el.visible(true)) {
				el.addClass("come-in");
				el.css('visibility', 'visible');
			} 
		});
	});
	
	// create fade in loading effect for carousels

	jQuery(window).load(function() {
		jQuery('.flexslider').each(function() {
			if (!jQuery(this).hasClass('sno-loading-check')) {
				jQuery('.flexslider').addClass('sno-loading-check');
				jQuery('.flexslider').animate({'opacity': 1}, { 'duration': 'slow'});
				jQuery('.flex-container').css('background', 'unset');
			}
		})	
	});
	// Firefox wasn't consistly setting the opacity on window load, so adding these lines as a backup
	jQuery(document).ready(function() {
		setTimeout(function(){ 
			jQuery('.flexslider').each(function() {
				if (!jQuery(this).hasClass('sno-loading-check')) {
					jQuery('.flexslider').addClass('sno-loading-check');
					jQuery('.flexslider').animate({'opacity': 1}, { 'duration': 'slow'});
					jQuery('.flex-container').css('background', 'unset');
				}
			})
		}, 1000);
	});
	// end Firefox fix

	// jump navigation options when Above Header widget area is activated
	
	if (jQuery('#upperwrap-outer').is(':visible')) {
		
		var top_elements = jQuery('#upperwrap-outer').offset().top;
		var wp_adminbar = 0;
		if (jQuery('#wpadminbar').length > 0) wp_adminbar = jQuery('#wpadminbar').height();
		
		var jumpbutton = top_elements + 20;
		var headerLocation   = jQuery("#wrap").offset().top;
		if ( headerLocation > jQuery(window).height() ) { 
			jQuery('#jump-to-header').css('top',jumpbutton + 'px').fadeIn();
		}
		jQuery(window).scroll(function () {
			if (jQuery(this).scrollTop() > (headerLocation - jQuery(window).height()) ) {
				jQuery('#jump-to-header').fadeOut();
				jQuery('#jump-arrow').fadeOut();
			} else {
				jQuery('#jump-to-header').fadeIn();
				jQuery('#jump-arrow').fadeIn();
			}
		});
	
		jQuery('#jump-to-header').click(function () {
			jQuery('html, body').animate({ scrollTop: jQuery("#wrap").offset().top - wp_adminbar }, 500);
			return false;
		});
		jQuery('#jump-arrow').click(function () {
			jQuery('html, body').animate({ scrollTop: jQuery("#wrap").offset().top - wp_adminbar }, 500);
			return false;
		});
	
	}

	// scroll to top functionality on long-form template

	jQuery("#snotop").hide();
	jQuery(function () {
		jQuery(window).scroll(function () {
			if (jQuery(this).scrollTop() > 400) {
				jQuery('#snotop').fadeIn();
			} else {
				jQuery('#snotop').fadeOut();
			}
			if (jQuery(this).scrollTop() > 200) {
				jQuery('.header').fadeIn();
			}
			
		});

		jQuery('#back-top a').click(function () {
			jQuery('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});

	});

	// immersive image on long-form -- jump to main story

	jQuery(document).ready(function() {
		if (jQuery('#mainbody').is(':visible')) {
			
			var wp_adminbar = 0;
			if (jQuery('#wpadminbar').length > 0) wp_adminbar = jQuery('#wpadminbar').height();
			
			jQuery('#jump-arrow').click(function () {
				jQuery('html, body').animate({ scrollTop: jQuery("#mainbody").offset().top - wp_adminbar }, 500);
				jQuery('#jump-arrow').fadeOut();
				return false;
			});

			jQuery(window).scroll(function () {
				if (jQuery(this).scrollTop() > jQuery(window).height() ) {
					jQuery('#jump-arrow').fadeOut();
				} else {
					jQuery('#jump-arrow').fadeIn();
				}
			});
			
		};
	});

});



jQuery(document).ready(function(){
	
	// moving on to other ideas.  Let's hide poll widgets if there are no polls
	jQuery("div:contains('there are no polls available at the moment')").closest('.widgetwrap').hide();
	
});

// jump navigation on long-form menu

jQuery(document).ready(function () {
	jQuery('li.longform-menu').click(function () {
		var target = jQuery(this).data('part');
		jQuery('html, body').animate({ scrollTop: jQuery("#spacer" + target).offset().top }, 500);
		return false;
	});
});

jQuery(function($) {
	$('body').on('click', '.moreheadlines', function(){
		var videoid = $(this).data('video');
		$("#loadingimage").show();
		$("#videowrap").fadeOut();
		$.ajax({
			url: frontend_ajax_object.ajaxurl,
			type: 'POST',
			data: {
				'action': 'replace_video',
				'type': 'video',
				'id': videoid,
			},
			success:function(results) { 
				$("#moreposts").replaceWith(results); 
				$("#loadingimage").hide();
			}
		});
	});
});


jQuery(document).ready(function () {
	jQuery('body').on('click', '.sno-content-card', function() {
		var href = jQuery(this).find("a").attr("href");
		if(href) {
			window.location = href;
		}
	});
});

