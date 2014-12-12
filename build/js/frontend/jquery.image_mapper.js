/*

Wordpress Image Mapper

Pin mapper for custom images.

Copyright (c) 2013 Br0 (shindiristudio.com)

Project site: http://codecanyon.net/
Project demo: http://shindiristudio.com/imgmapper

*/

(function($){
	
	$.fn.imageMapper = function(options) {
	
	var defaults = {
		itemOpenStyle: 'click',
		itemDesignStyle: 'fluid'
	};
	
	var settings = $.extend( {}, defaults, options);
	
	var map_original_width;
	var map_original_height;
	var clicked;
	var tab_clicked;
	
	var contentWrapperOld;
	var contentOld;
	var contentHeaderOld;
	var contentTextOld;
	var contentTabOld;
	var contentAdditionalOld;
	
	var width; 
	var height;
	
	var cHeight;
	var cWidth;
	
	var designStyle;
	
	return this.each( function() {
			var id = $(this).attr('id').substring(11, $(this).attr('id').indexOf('-'));
			
			imapperInit(id, settings.itemOpenStyle, settings.itemDesignStyle);
			
			var openStyle = $('#imapper' + id + '-value-item-open-style').html();
			
			width = $(this).find('.imapper-content').width();
			height = $(this).find('.imapper-content').height();
			
			var map_width = $(this).find('#imapper' + id + '-map-image').width();
			var map_height = $(this).find('#imapper' + id + '-map-image').height();
			
			var map_original_size = imapperGetOriginalSize('#imapper' + id + '-map-image')
			map_original_width = map_original_size[0];
			map_original_height = map_original_size[1];
			var parent_width = ($(this).parent().width() < map_original_width) ? $(this).parent().width() : map_original_width;

			var multiplier = parent_width / map_original_width;
			cHeight = new Array();
			cWidth = new Array();
			
			designStyle = $('#imapper' + id + '-value-item-design-style').html();

			clicked = new Array();
			tab_clicked = new Array();
			
			contentWrapperOld = new Array();
			contentOld = new Array();
			contentHeaderOld = new Array();
			contentTextOld = new Array();
			contentTabOld = new Array();
			contentAdditionalOld = new Array();
			
			$(this).css('width', parent_width);
			//$(this).css('height', map_original_height);
			
			$('.imapper' + id + '-pin').each( function() {
				var pinId = $(this).attr('id').substring($(this).attr('id').indexOf('-pin') + 4);
				clicked[pinId] = 0;
				tab_clicked[pinId] = 1;

				var img_width = $(this).width();
				var img_height = $(this).height();
				var radius = parseInt($(this).parent().find('.imapper-content').css('border-bottom-left-radius')) / 2 + 1;
				
				contentTabOld[pinId] = new Array();
				contentAdditionalOld[pinId] = new Array();
				
				var tNumber = parseInt($(this).parent().find('.imapper-value-tab-number').html());
				cHeight[pinId] = ($(window).width() <= 600 && designStyle == 'responsive') ? map_original_height - ((tNumber > 1) ? tNumber : 0) * (75 - radius) : height;
				cWidth[pinId] = ($(window).width() <= 600 && designStyle == 'responsive') ? map_original_width - ((tNumber > 1) ? tNumber : 0) * (75 - radius) : width;
				
				if ($(this).attr('src').indexOf('images/icons/4/') >= 0)
					$(this).addClass('pin-mini-style');
				else
					$(this).addClass('pin-style');
					
				if ($(this).attr('src').indexOf('images/icons/2/') >= 0 || $(this).attr('src').indexOf('images/icons/1/') >= 0)
					$(this).parent().find('.imapper-content').wrapInner('<div class="imapper-content-inner" style="width: ' + width + 'px; height: ' + height + 'px;" />');			
				
				if ($(this).attr('src').indexOf('images/icons/5/') >= 0)
				{
					$(this).parent().find('.imapper-pin-icon').css('left', -$(this).parent().find('.imapper-pin-icon').width() / 2 - 1 + 'px');
				}
					
				if ($(this).attr('src').indexOf('images/icons/1/') < 0 && $(this).attr('src').indexOf('images/icons/2/') < 0 && $(this).attr('src').indexOf('images/icons/3/') < 0 && $(this).attr('src').indexOf('images/icons/4/') < 0 && $(this).attr('src').indexOf('images/icons/5/') < 0)
				{
					$(this).css('top', -$(this).height() + 'px');
					$(this).css('left', -$(this).width()/2 + 'px');
				}
			});
			

			
			if (multiplier <= 1)
			{
				$(this).find('.imapper-pin-wrapper').each(function() {
					$(this).css('transform', 'scale(' + multiplier + ')');
				});
			}
			$(this).css('visibility', 'visible');
			
			$('.imapper-content-tab').find('a').live('click', function(e) {
				e.preventDefault();
				
				var pinId = $(this).parent().parent().parent().find('.imapper' + id + '-pin').attr('id').substring($(this).parent().parent().parent().find('.imapper' + id + '-pin').attr('id').indexOf('-pin') + 4);
				var newClick = parseInt($(this).html());
				var dis = $(this).parent().parent();
				var position = $(this).parent().parent().parent().find('.imapper' + id + '-value-item-open-position').html();
				
				if (newClick != tab_clicked[pinId])
				{		
					if (position == 'left' || position == 'right')
					{	
						if (newClick > tab_clicked[pinId])
						{
							$(dis).find('.imapper-content').eq(tab_clicked[pinId] - 1).find('.imapper-content-inner').fadeOut('fast');
							$(dis).find('.imapper-content').eq(tab_clicked[pinId] - 1).animate({ height: 0}, {duration: 400});
							
							for (var i = tab_clicked[pinId]; i < newClick; i++)
							{
								var bottomNew = parseInt($(dis).find('.imapper-content-tab').eq(i - 1).css('bottom')) - cHeight[pinId];
								$(dis).find('.imapper-content-tab').eq(i - 1).animate({ bottom: bottomNew}, {duration: 400});
								
								if (i != tab_clicked[pinId])
									$(dis).find('.imapper-content').eq(i - 1).css('bottom', parseInt($(dis).find('.imapper-content').eq(i - 1).css('bottom')) - cHeight[pinId]);
							}
							
							$(dis).find('.imapper-content').eq(newClick - 1).find('.imapper-content-inner').fadeIn('fast');
							var bottomNew2 = parseInt($(dis).find('.imapper-content').eq(newClick - 1).css('bottom')) - cHeight[pinId];
							$(dis).find('.imapper-content').eq(newClick - 1).animate({ height: cHeight[pinId], bottom: bottomNew2}, {duration: 400});
						}
						else
						{
							$(dis).find('.imapper-content').eq(tab_clicked[pinId] - 1).find('.imapper-content-inner').fadeOut('fast');
							var bottomNew = parseInt($(dis).find('.imapper-content').eq(tab_clicked[pinId] - 1).css('bottom')) + cHeight[pinId];
							$(dis).find('.imapper-content').eq(tab_clicked[pinId] - 1).animate({ height: 0, bottom: bottomNew}, {duration: 400});
								
							$(dis).find('.imapper-content').eq(newClick - 1).find('.imapper-content-inner').fadeIn('fast');
							$(dis).find('.imapper-content').eq(newClick - 1).animate({ height: cHeight[pinId]}, {duration: 400});
							
							for (var i = newClick; i < tab_clicked[pinId]; i++)
							{
								var bottomNew2 = parseInt($(dis).find('.imapper-content-tab').eq(i - 1).css('bottom')) + cHeight[pinId];
								$(dis).find('.imapper-content-tab').eq(i - 1).animate({ bottom: bottomNew2}, {duration: 400});
								
								if (i != newClick)
									$(dis).find('.imapper-content').eq(i - 1).css('bottom', parseInt($(dis).find('.imapper-content').eq(i - 1).css('bottom')) + cHeight[pinId]);
							}
						}
					}
					else if (position == 'top' || position == 'bottom')
					{
						if (newClick > tab_clicked[pinId])
						{
							$(dis).find('.imapper-content').eq(tab_clicked[pinId] - 1).find('.imapper-content-inner').fadeOut('fast');
							$(dis).find('.imapper-content').eq(tab_clicked[pinId] - 1).animate({ width: 0}, {duration: 400});
							for (var i = tab_clicked[pinId]; i < newClick; i++)
							{
								var rightNew = parseInt($(dis).find('.imapper-content-tab').eq(i - 1).css('right')) - cWidth[pinId];
								$(dis).find('.imapper-content-tab').eq(i - 1).animate({ right: rightNew}, {duration: 400});
								
								if (i != tab_clicked[pinId])
									$(dis).find('.imapper-content').eq(i - 1).css('right', parseInt($(dis).find('.imapper-content').eq(i - 1).css('right')) - cWidth[pinId]);
							}
							
							$(dis).find('.imapper-content').eq(newClick - 1).find('.imapper-content-inner').fadeIn('fast');
							var rightNew2 = parseInt($(dis).find('.imapper-content').eq(newClick - 1).css('right')) - cWidth[pinId];
							$(dis).find('.imapper-content').eq(newClick - 1).animate({ width: cWidth[pinId], right: rightNew2}, {duration: 400});
						}
						else
						{
							$(dis).find('.imapper-content').eq(tab_clicked[pinId] - 1).find('.imapper-content-inner').fadeOut('fast');
							var rightNew = parseInt($(dis).find('.imapper-content').eq(tab_clicked[pinId] - 1).css('right')) + cWidth[pinId];
							$(dis).find('.imapper-content').eq(tab_clicked[pinId] - 1).animate({ width: 0, right: rightNew}, {duration: 400});
								
							$(dis).find('.imapper-content').eq(newClick - 1).find('.imapper-content-inner').fadeIn('fast');
							$(dis).find('.imapper-content').eq(newClick - 1).animate({ width: cWidth[pinId]}, {duration: 400});
							
							for (var i = newClick; i < tab_clicked[pinId]; i++)
							{
								var rightNew2 = parseInt($(dis).find('.imapper-content-tab').eq(i - 1).css('right')) + cWidth[pinId];
								$(dis).find('.imapper-content-tab').eq(i - 1).animate({ right: rightNew2}, {duration: 400});
								
								if (i != newClick)
									$(dis).find('.imapper-content').eq(i - 1).css('right', parseInt($(dis).find('.imapper-content').eq(i - 1).css('right')) + cWidth[pinId]);
							}
						}
					}
					
					$(dis).find('.imapper-content').eq(newClick - 1).find('.imapper-content-text').imCustomScrollbar('update');
					tab_clicked[pinId] = newClick;

				}
			});
			
			if (openStyle == 'hover')
			{
				$('.imapper' + id + '-pin').mouseover( function() {
					
					var pinId = $(this).attr('id').substring($(this).attr('id').indexOf('-pin') + 4);
					var properties2 = {};
					var duration = {duration: 400, queue: false};
					var cpWidth = ($(window).width() <= 600  && designStyle == 'responsive') ? ($(this).parent().parent().width() / parseFloat($(this).parent().css('transform').substring($(this).parent().css('transform').indexOf('(') + 1, 
						$(this).parent().css('transform').indexOf(',')))) : width;
					
					if ($(window).width() > 600 && designStyle == 'responsive' || designStyle == 'fluid')
					{
						$(this).css('z-index', '12');
						$('#imapper' + id + '-value-item' + pinId + '-tab-number').css('z-index', '12');
						$('#imapper' + id + '-pin' + pinId + '-content-wrapper').css('z-index', '11');
					}
					else
					{
						$('#imapper' + id + '-pin' + pinId + '-content-wrapper').css('z-index', '13');
					}

					$(this).parent().css('z-index', '100');
					
					if ($('#imapper' + id + '-pin' + pinId + '-content-wrapper').css('visibility') == 'visible')
						$('#imapper' + id + '-pin' + pinId + '-content-wrapper').css('visibility', 'visible');
					
					if ($(this).attr('src').indexOf('images/icons/2/') >= 0)
						{
							if ($(this).parent().find('.imapper' + id + '-value-item-open-position').html() == 'right')
								properties2 = {width: cpWidth};
							else
								properties2 = {width: cpWidth, marginLeft: 0};
								
							duration = {duration: 400, queue: false}
						}
					
					$('#imapper' + id + '-pin' + pinId + '-content-wrapper').stop(true).animate({
						opacity: 1
					}, duration);
					
					if ($(this).attr('src').indexOf('images/icons/2/') >= 0)
						$('#imapper' + id + '-pin' + pinId + '-content-wrapper').find('.imapper-content').stop(true).animate(properties2, {
									duration: 400,
									queue: false
								});
					
				});
				
				$('.imapper-pin-wrapper').mouseleave( function() {

					var pinId = $(this).find('.imapper-content-wrapper').attr('id').substring($(this).find('.imapper-content-wrapper').attr('id').indexOf('-pin') + 4);
					var properties = {opacity: 1};
					var properties2 = {};
					var duration = {};
					
					var cpWidth = ($(window).width() <= 600 && designStyle == 'responsive') ? ($(this).parent().width() / parseFloat($(this).css('transform').substring($(this).css('transform').indexOf('(') + 1, 
						$(this).css('transform').indexOf(',')))) : width;
					
					if ($(this).find('.imapper' + id + '-pin').attr('src').indexOf('images/icons/2/') >= 0)
					{
						if ($(this).find('.imapper' + id + '-value-item-open-position').html() == 'right')
							properties2 = {width: 0};
						else
							properties2 = {width: 0, marginLeft: cpWidth};
									
						duration = {duration: 400, queue: false};
					}
					else
					{
						duration = {
							duration: 400,
							queue: false,
							complete: function() {
								$(this).find('.imapper-content').parent().css('visibility', 'visible');
							}
						};
					}
					
					$(this).find('.imapper-content-wrapper').stop(true).animate(properties, duration);
					
					if ($(this).find('.imapper' + id + '-pin').attr('src').indexOf('images/icons/2/') >= 0)
						$(this).find('.imapper-content').stop(true).animate(properties2, {
									duration: 400,
									queue: false,
									complete: function() {
										$(this).parent().css('visibility', 'visible');
									}
							});
					
					$('#imapper' + id + '-pin' + pinId).css('z-index', '10');
					$('#imapper' + id + '-value-item' + pinId + '-tab-number').css('z-index', '10');
					$('#imapper' + id + '-pin' + pinId + '-content-wrapper').css('z-index', '9');
					
					$(this).css('z-index', '');	
				});
			}
			else if (openStyle == 'click')
			{
				$('.imapper' + id + '-pin').click( function() {
					var pinId = $(this).attr('id').substring($(this).attr('id').indexOf('-pin') + 4);
					var cpWidth = ($(window).width() <= 600  && designStyle == 'responsive') ? ($(this).parent().parent().width() / parseFloat($(this).parent().css('transform').substring($(this).parent().css('transform').indexOf('(') + 1, 
						$(this).parent().css('transform').indexOf(',')))) : width;
					
					if (clicked[pinId] == 0)
					{
						var properties = {opacity: 1};
						var properties2 = {};
						var duration = {duration: 400, queue: true};
												
						$('.imapper' + id + '-pin').each(function() {
							var pid = $(this).attr('id').substring($(this).attr('id').indexOf('-pin') + 4);
						 	if (clicked[pid] == 1)
								$(this).trigger('click');
						});
						
						if ($(window).width() > 600 && designStyle == 'responsive' || designStyle == 'fluid')
						{
							$(this).css('z-index', '12');
							$('#imapper' + id + '-value-item' + pinId + '-tab-number').css('z-index', '12');
							$('#imapper' + id + '-pin' + pinId + '-content-wrapper').css('z-index', '11');
							
						}
						else
						{
							$('#imapper' + id + '-pin' + pinId + '-content-wrapper').css('z-index', '13');
						}

						$(this).parent().css('z-index', '100');
						
						if ($(this).attr('src').indexOf('images/icons/2/') >= 0)
						{
							if ($(this).parent().find('.imapper' + id + '-value-item-open-position').html() == 'right')
								properties2 = {width: cpWidth};
							else
								properties2 = {width: cpWidth, marginLeft: 0};
						}
						
						$('#imapper' + id + '-pin' + pinId + '-content-wrapper').css('visibility', 'visible').animate(properties, duration);
						
						if ($(this).attr('src').indexOf('images/icons/2/') >= 0)
							$('#imapper' + id + '-pin' + pinId + '-content-wrapper').find('.imapper-content').animate(properties2,
							{
								duration: 400,
								queue: false
							});
						
						$(this).find('.imapper-content-text').imCustomScrollbar('update');
						clicked[pinId] = 1;
					}
					else
					{
						var properties = {opacity: 1};
						var properties2 = {};
						var duration = {};
						
						if ($(this).attr('src').indexOf('images/icons/2/') >= 0)
						{
							if ($(this).parent().find('.imapper' + id + '-value-item-open-position').html() == 'right')
								properties2 = {width: 0};
							else
								properties2 = {width: 0, marginLeft: cpWidth};
								
							duration = {duration: 400, queue: false};
						}
						else
							duration = {
							duration: 400,
							queue: false,
							complete: function() {
								$(this).css('visibility', 'visible');
							}
						};

						$('#imapper' + id + '-pin' + pinId + '-content-wrapper').animate(properties, duration);
						
						if ($(this).attr('src').indexOf('images/icons/2/') >= 0)
							$('#imapper' + id + '-pin' + pinId + '-content-wrapper').find('.imapper-content').animate(properties2,
							{
								duration: 400,
								queue: false,
								complete: function() {
									$(this).parent().css('visibility', 'visible');
								}
						});
						
						$('#imapper' + id + '-pin' + pinId).css('z-index', '10');
						$('#imapper' + id + '-value-item' + pinId + '-tab-number').css('z-index', '10');
						$('#imapper' + id + '-pin' + pinId + '-content-wrapper').css('z-index', '9');

						$(this).parent().css('z-index', '');
						
						clicked[pinId] = 0;
					}
				});
				
				$('#imapper' + id + '-map-image').click(function() {
					$('.imapper' + id + '-pin').each(function() {
						var pid = $(this).attr('id').substring($(this).attr('id').indexOf('-pin') + 4);
						 if (clicked[pid] == 1)
							$(this).trigger('click');
					});
				});
			}
			
			$('.imapper-close-button').live('click', function() {
				if (openStyle == 'click')
					$(this).parent().parent().find('.imapper' + id + '-pin').trigger('click');
				else if (openStyle == 'hover')
					$(this).parent().parent().trigger('mouseleave');
			});
			
			$('.imapper' + id + '-pin').each(function() {
				var pinId = $(this).attr('id').substring($(this).attr('id').indexOf('-pin') + 4);
				
				contentWrapperOld[pinId] = [ $(this).parent().find('.imapper-content-wrapper').css('top'), $(this).parent().find('.imapper-content-wrapper').css('left'), 
					$(this).parent().find('.imapper-content-wrapper').css('width'), $(this).parent().find('.imapper-content-wrapper').css('height'), $(this).parent().find('.imapper-content-wrapper').css('z-index') ];
				
				contentOld[pinId] = [ $(this).parent().find('.imapper-content').not('.imapper-content-additional').css('top'), $(this).parent().find('.imapper-content').not('.imapper-content-additional').css('left'), 
					$(this).parent().find('.imapper-content').not('.imapper-content-additional').css('width'), $(this).parent().find('.imapper-content').not('.imapper-content-additional').css('height'),  
					$(this).parent().find('.imapper-content').not('.imapper-content-additional').css('bottom'), $(this).parent().find('.imapper-content').not('.imapper-content-additional').css('right')];
				
				contentHeaderOld[pinId] = [ $(this).parent().find('.imapper-content-header').css('width'), $(this).parent().find('.imapper-content-header').css('font-size'), 
					$(this).parent().find('.imapper-content-header').css('padding-left') ];
				
				contentTextOld[pinId] = [ $(this).parent().find('.imapper-content-text').css('width'), $(this).parent().find('.imapper-content-text').css('height'), 
					$(this).parent().find('.imapper-content-text').css('margin-top'), $(this).parent().find('.imapper-content-text').css('font-size'), $(this).parent().find('.imapper-content-text').css('padding-left') ];
				
				$(this).parent().find('.imapper-content-tab').each(function(index) {
					contentTabOld[pinId][index] = [ $(this).css('width'), $(this).css('height'), $(this).css('bottom'), $(this).css('right') ];	
				});
				
				$(this).parent().find('.imapper-content-additional').each(function(index) {
					contentAdditionalOld[pinId][index] = [ $(this).css('width'), $(this).css('height'), $(this).css('bottom'), $(this).css('right') ];
				});
			});
			
			if ($(window).width() <= 600  && designStyle == 'responsive')
			{
				$('.imapper' + id + '-pin').each(function() {
					var positionLeft = (-parseInt($(this).parent().css('left')) / parseFloat($(this).parent().css('transform').substring($(this).parent().css('transform').indexOf('(') + 1, 
						$(this).parent().css('transform').indexOf(',')))) + 'px';
						
					var positionTop = (-parseInt($(this).parent().css('top')) / parseFloat($(this).parent().css('transform').substring($(this).parent().css('transform').indexOf('(') + 1, 
						$(this).parent().css('transform').indexOf(',')))) + 'px';
					
					var pinId = $(this).attr('id').substring($(this).attr('id').indexOf('-pin') + 4);	
					var pos = $(this).attr('src').indexOf('images/');
					var pluginUrl = $(this).attr('src').substring(0, pos);
					var position = $(this).parent().find('.imapper' + id + '-value-item-open-position').html();
					var radius = parseInt($(this).parent().find('.imapper-content').css('border-bottom-right-radius')) / 2 + 1;
					
					$(this).parent().find('.imapper-content-wrapper').css({'top': positionTop, 'left': positionLeft, 'width': map_original_width + 'px', 'height': map_original_height + 'px', 'z-index': '15'});
					$(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'top': '0px', 'left': '0px', 'width': map_original_width + 'px', 'height': map_original_height + 'px'});
					
					if ($(this).attr('src').indexOf('images/icons/2/') >= 0)
					{
						$(this).parent().find('.imapper-content').css('width', '0px');
						if (position == 'left')
							$(this).parent().find('.imapper-content').css('margin-left', map_original_width + 'px');
					}
					else if ($(this).attr('src').indexOf('images/icons/1/') >= 0)
					{
						if (position == 'left' || position == 'right')
						{
							$(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'height': cHeight[pinId], 'top': '', 'bottom': '0px'});
							
							var bottom = cHeight[pinId];
							var bottom_content = cHeight[pinId] + (75 - radius);
							$(this).parent().find('.imapper-content-tab').each(function() {
								$(this).css({'width': map_original_width, 'height': '75px', 'bottom': bottom});
								$(this).find('a').css({'height': '75px', 'font-size': '24px'});
								bottom += 75 - radius;
							});
							$(this).parent().find('.imapper-content-additional').each(function() {
								$(this).css({'width': map_original_width, 'bottom': bottom_content});
								bottom_content += 75 - radius;	
							});
						}
						else if (position == 'top' || position == 'bottom')
						{
							$(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'width': cWidth[pinId], 'left': '', 'right': '0px'});
							
							var right = cWidth[pinId];
							var right_content = cWidth[pinId] + (75 - radius);
							$(this).parent().find('.imapper-content-tab').each(function() {
								$(this).css({'height': map_original_height, 'width': '75px', 'right': right});
								$(this).find('a').css({'width': '75px', 'font-size': '24px', 'height': map_original_height});
								right += 75 - radius;
							});
							$(this).parent().find('.imapper-content-additional').each(function() {
								$(this).css({'height': map_original_height, 'right': right_content});
								right_content += 75 - radius;	
							});
						}
					}

					$(this).parent().find('.imapper-content-header').css({'width': map_original_width - 30 + 'px', 'font-size': parseInt($(this).parent().find('.imapper-content-header').css('font-size')) * 2 + 'px', 
						'padding-left': '20px'});
					
					var textHeight = $(this).parent().find('.imapper-content').height() - $(this).parent().find('.imapper-content-header').height() - 50;
					$(this).parent().find('.imapper-content-text').css({'width': map_original_width - 30 + 'px', 'height': textHeight, 'margin-top': '70px', 
						'font-size': parseInt($(this).parent().find('.imapper-content-text').css('font-size')) * 2 + 'px', 'padding-left': '20px'});
						
					$(this).parent().find('.imapper-content-text').each(function() {
						$(this).imCustomScrollbar('update');
					});
					
					$(this).parent().find('.imapper-arrow').css('display', 'none');
					$(this).parent().find('.imapper-arrow-border').css('display', 'none');
					$(this).parent().find('.imapper-triangle-border').css('display', 'none');
					
					$(this).parent().find('.imapper-content-wrapper').append('<img class="imapper-close-button" src="' + pluginUrl + 'images/close.jpg">');
					$(this).parent().find('.imapper-close-button').css({'position': 'absolute', 'right': '30px', 'top': '25px', 'z-index': '100', 'transform': 'scale(2.3)', 'cursor': 'pointer'});
				});
			}
	
	$(window).resize(function() {
		$("div[id*='imagemapper']").each( function() {
				
			var id = $(this).attr('id').substring(11, $(this).attr('id').indexOf('-'));

			var parent_width = ($(this).parent().width() < map_original_width) ? $(this).parent().width() : map_original_width;
			var multiplier = parent_width / map_original_width;
			$(this).css('width', parent_width);
			
			if (multiplier <= 1)
			{
				$(this).find('.imapper-pin-wrapper').each(function() {
					$(this).css('transform', 'scale(' + multiplier + ')');
				});
				
				$(this).find('.imapper-content-text').each(function() {
					$(this).imCustomScrollbar('update');
				});
			}
			
			if ($(window).width() <= 600  && designStyle == 'responsive')
			{
				$('.imapper' + id + '-pin').each(function() {
					var pinId = $(this).attr('id').substring($(this).attr('id').indexOf('-pin') + 4);
					var positionLeft = (-parseInt($(this).parent().css('left')) / parseFloat($(this).parent().css('transform').substring($(this).parent().css('transform').indexOf('(') + 1, 
						$(this).parent().css('transform').indexOf(',')))) + 'px';
						
					var positionTop = (-parseInt($(this).parent().css('top')) / parseFloat($(this).parent().css('transform').substring($(this).parent().css('transform').indexOf('(') + 1, 
						$(this).parent().css('transform').indexOf(',')))) + 'px';
						
					var pos = $(this).attr('src').indexOf('images/');
					var pluginUrl = $(this).attr('src').substring(0, pos);
					var position = $(this).parent().find('.imapper' + id + '-value-item-open-position').html();
					var radius = parseInt($(this).parent().find('.imapper-content').not('.imapper-content-additional').css('border-bottom-right-radius')) / 2 + 1;
					
					var tNumber = parseInt($(this).parent().find('.imapper-value-tab-number').html());
					cHeight[pinId] = map_original_height - ((tNumber > 1) ? tNumber : 0) * (75 - radius);
					cWidth[pinId] = map_original_width - ((tNumber > 1) ? tNumber : 0) * (75 - radius);
					
					$(this).parent().find('.imapper-content-wrapper').css({'top': positionTop, 'left': positionLeft, 'width': map_original_width + 'px', 'height': map_original_height + 'px', 'z-index': '15'});
					$(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'top': '0px', 'left': '0px', 'width': map_original_width + 'px', 'height': map_original_height + 'px'});
					
					if ($(this).attr('src').indexOf('images/icons/2/') >= 0)
					{
						if (clicked[pinId] == 0)
						{
							$(this).parent().find('.imapper-content').css('width', '0px');
							if (position == 'left')
								$(this).parent().find('.imapper-content').css('margin-left', map_original_width + 'px');
						}
						else
						{
							$(this).parent().find('.imapper-content').css('width', map_original_width + 'px');
							if (position == 'left')
								$(this).parent().find('.imapper-content').css('margin-left', '0px');
						}
					}
					else if ($(this).attr('src').indexOf('images/icons/1/') >= 0)
					{
						tab_clicked[pinId] = 1;
						if (position == 'left' || position == 'right')
						{
						   $(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'height': cHeight[pinId], 'top': '', 'bottom': '0px'});
							
							var bottom = cHeight[pinId];
							var bottom_content = cHeight[pinId] + (75 - radius);
							$(this).parent().find('.imapper-content-tab').each(function() {
								$(this).css({'width': map_original_width, 'height': '75px', 'bottom': bottom});
								$(this).find('a').css({'height': '75px', 'font-size': '24px'});
								bottom += 75 - radius;
							});
							$(this).parent().find('.imapper-content-additional').each(function() {
								$(this).css({'width': map_original_width, 'height': '0px', 'bottom': bottom_content});
								bottom_content += 75 - radius;	
							});
						}
						else if (position == 'top' || position == 'bottom')
						{
						   $(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'width': cWidth[pinId], 'left': '', 'right': '0px'});
							
							var right = cWidth[pinId];
							var right_content = cWidth[pinId] + (75 - radius);
							$(this).parent().find('.imapper-content-tab').each(function() {
								$(this).css({'height': map_original_height, 'width': '75px', 'right': right});
								$(this).find('a').css({'width': '75px', 'font-size': '24px', 'height': map_original_height});
								right += 75 - radius;
							});
							$(this).parent().find('.imapper-content-additional').each(function() {
								$(this).css({'height': map_original_height, 'width': '0px', 'right': right_content});
								right_content += 75 - radius;	
							});
						}
					}
					
					$(this).parent().find('.imapper-content-header').css({'width': map_original_width - 30 + 'px', 'font-size': parseInt(contentHeaderOld[pinId][1]) * 2 + 'px', 'padding-left': '20px'});
					
					var textHeight = $(this).parent().find('.imapper-content').height() - $(this).parent().find('.imapper-content-header').height() - 50;
					$(this).parent().find('.imapper-content-text').css({'width': map_original_width - 30 + 'px', 'height': textHeight, 'margin-top': '70px', 'font-size': parseInt(contentTextOld[pinId][3]) * 2 + 'px', 
						'padding-left': '20px'});
						
					$(this).parent().find('.imapper-content-text').each(function() {
						$(this).imCustomScrollbar('update');
					});
					
					$(this).parent().find('.imapper-arrow').css('display', 'none');
					$(this).parent().find('.imapper-arrow-border').css('display', 'none');
					$(this).parent().find('.imapper-triangle-border').css('display', 'none');
					
					$(this).parent().find('.imapper-content-wrapper').append('<img class="imapper-close-button" src="' + pluginUrl + 'images/close.jpg">');
					$(this).parent().find('.imapper-close-button').css({'position': 'absolute', 'right': '30px', 'top': '25px', 'z-index': '100', 'transform': 'scale(2.3)', 'cursor': 'pointer', 'box-shadow': 'none'});
					
				});
			}
			else if ($(window).width() > 600 && designStyle == 'responsive')
			{
				$('.imapper' + id + '-pin').each(function() {
					var pinId = $(this).attr('id').substring($(this).attr('id').indexOf('-pin') + 4);
					var position = $(this).parent().find('.imapper' + id + '-value-item-open-position').html();
					cHeight[pinId] = height;
					cWidth[pinId] = width;
					
					$(this).parent().find('.imapper-content-wrapper').css({'top': contentWrapperOld[pinId][0], 'left': contentWrapperOld[pinId][1], 'width': contentWrapperOld[pinId][2], 
						'height': contentWrapperOld[pinId][3], 'z-index': contentWrapperOld[pinId][4]});

					$(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'top': contentOld[pinId][0], 'left': contentOld[pinId][1], 'width': contentOld[pinId][2], 'height': contentOld[pinId][3]});
					
					if ($(this).attr('src').indexOf('images/icons/2/') >= 0 && position == 'left')
					{
						if (clicked[pinId] == 0)
							$(this).parent().find('.imapper-content').not('.imapper-content-additional').css('margin-left', width);
						else
							$(this).parent().find('.imapper-content').not('.imapper-content-additional').css('margin-left', '0px');
					}
					else if ($(this).attr('src').indexOf('images/icons/1/') >= 0)
					{
						tab_clicked[pinId] = 1;
						if (position == 'left' || position == 'right')
						{			
							$(this).parent().find('.imapper-content').not('.imapper-content-additional').css('top', '');
							$(this).parent().find('.imapper-content-tab').each(function(index) {
								$(this).css({'width': contentTabOld[pinId][index][0], 'height': contentTabOld[pinId][index][1], 'bottom': contentTabOld[pinId][index][2]});
								$(this).find('a').css({'height': '', 'font-size': '24px'});
							});
							$(this).parent().find('.imapper-content-additional').each(function(index) {
								$(this).css({'width': contentAdditionalOld[pinId][index][0], 'height': contentAdditionalOld[pinId][index][1], 'bottom': contentAdditionalOld[pinId][index][2]});
							});
						}
						else if (position == 'top' || position == 'bottom')
						{
							$(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'top': '', 'left': ''});
							$(this).parent().find('.imapper-content-tab').each(function(index) {
								$(this).css({'width': contentTabOld[pinId][index][0], 'height': contentTabOld[pinId][index][1], 'right': contentTabOld[pinId][index][3]});
								$(this).find('a').css({'width': '', 'font-size': '24px', 'height': contentTabOld[pinId][index][1]});
							});
							$(this).parent().find('.imapper-content-additional').each(function(index) {
								$(this).css({'width': contentAdditionalOld[pinId][index][0], 'height': contentAdditionalOld[pinId][index][1], 'right': contentAdditionalOld[pinId][index][3]});
							});
						}
					}
					
					$(this).parent().find('.imapper-content-header').css({'width': contentHeaderOld[pinId][0], 'font-size': contentHeaderOld[pinId][1], 'padding-left': contentHeaderOld[pinId][2]});
					$(this).parent().find('.imapper-content-text').css({'width': contentTextOld[pinId][0], 'height': contentTextOld[pinId][1], 'margin-top': contentTextOld[pinId][2], 
						'font-size': contentTextOld[pinId][3], 'padding-left': contentTextOld[pinId][4]});
					
					$(this).parent().find('.imapper-content-text').each(function() {
						$(this).imCustomScrollbar('update');
					});
					
					$(this).parent().find('.imapper-arrow').css('display', 'block');
					$(this).parent().find('.imapper-arrow-border').css('display', 'block');
					$(this).parent().find('.imapper-triangle-border').css('display', 'block');
					
					$(this).parent().find('.imapper-close-button').remove();
	
				});
			}
		});
	});
	
	});
	
	}
	
	function imapperGetOriginalSize(image)
	{
		var img = new Image(); 
		img.src = $(image).attr('src'); 
		var original_size = new Array();
		original_size[0] = img.width;
		original_size[1] = img.height;
		
		return original_size;
	}
	
	function imapperInit(id, itemOpenStyle, itemDesignStyle)
	{
		var mapperValues = '<div id="imapper' + id + '-values" style="display: none"><div id="imapper' + id + '-value-item-open-style">' + itemOpenStyle + '</div>';
		mapperValues += '<div id="imapper' + id + '-value-item-design-style">' + itemDesignStyle + '</div></div>';
		
		$('#imagemapper' + id + '-wrapper').prepend(mapperValues);
		$('#imapper' + id + '-map-image').css('max-width', '100%');

		$('#imagemapper' + id + '-wrapper').find('.imapper-pin-wrapper').each(function() {
			
			var pinId = $(this).find('.imapper' + id + '-pin').attr('id').substring($(this).attr('id').indexOf('-pin') + 4);
			var pinSrc = $(this).find('.imapper' + id + '-pin').attr('src');
			
			var dataTabNumber = $(this).find('.imapper-content').length;			
			var dataLeft = ($(this).attr('data-left') !== undefined) ? $(this).attr('data-left') : '50%';
			var dataTop = ($(this).attr('data-top') !== undefined) ? $(this).attr('data-top') : '50%';
			var dataOpenPosition = ($(this).attr('data-open-position') !== undefined) ? $(this).attr('data-open-position') : 'left';
			var dataPinColor = ($(this).attr('data-pin-color') !== undefined) ? $(this).attr('data-pin-color') : '#0000ff';
			var dataPinIcon = ($(this).attr('data-pin-icon') !== undefined) ? $(this).attr('data-pin-icon') : 'icon-plane';
			
			var dataTextColor = ($(this).find('.imapper-content-wrapper').attr('data-text-color') !== undefined) ? $(this).find('.imapper-content-wrapper').attr('data-text-color') : '#dbdbdb';
			var dataBackColor = ($(this).find('.imapper-content-wrapper').attr('data-back-color') !== undefined) ? $(this).find('.imapper-content-wrapper').attr('data-back-color') : '#c4302b';
			var dataBorderColor = ($(this).find('.imapper-content-wrapper').attr('data-border-color') !== undefined) ? $(this).find('.imapper-content-wrapper').attr('data-border-color') : '#c4302b';
			var dataBorderRadius = ($(this).find('.imapper-content-wrapper').attr('data-border-radius') !== undefined) ? $(this).find('.imapper-content-wrapper').attr('data-border-radius') : '10px';
			var dataWidth = ($(this).find('.imapper-content-wrapper').attr('data-width') !== undefined) ? $(this).find('.imapper-content-wrapper').attr('data-width') : '200px';
			var dataHeight = ($(this).find('.imapper-content-wrapper').attr('data-height') !== undefined) ? $(this).find('.imapper-content-wrapper').attr('data-height') : '150px';
			var dataFont = ($(this).find('.imapper-content-wrapper').attr('data-font') !== undefined) ? $(this).find('.imapper-content-wrapper').attr('data-font') : 'Arial';
			
			$(this).css({'position': 'absolute', 'left': dataLeft, 'top': dataTop});
			
			if (dataTabNumber > 1)
				tabCss = 'display: block; width: 16px; height: 16px; border-radius: 8px; border: 1px solid #191970; background-color: #4f92d3; color: white; font-size: 10px; line-height: 1.4; text-align: center; position: absolute; top: -70px; left: 2px; z-index: 10';
			else
				tabCss = 'display: none;';
			
			$(this).append('<div id="imapper' + id + '-value-item' + pinId + '-open-position" class="imapper' + id + '-value-item-open-position" style="display:none;">' + dataOpenPosition + '</div>');
			$(this).append('<div id="imapper' + id + '-value-item' + pinId + '-tab-number" class="imapper-value-tab-number" style="' + tabCss + '">' + dataTabNumber + '</div>');
			$(this).append('<div id="imapper' + id + '-value-item' + pinId + '-border-color" class="imapper-value-border-color" style="display: none;">' + dataBorderColor + '</div>');
			
			$(this).find('.imapper-content-wrapper').css('color', $(this).find('.imapper-content-wrapper').attr('data-text-color'));
			$(this).find('.imapper-content-wrapper').append('<div class="imapper-arrow" style="border-color: ' + dataBackColor + ' transparent transparent transparent;"></div>');
				
			$(this).find('.imapper-content').each(function() {
				$(this).css({'background-color': dataBackColor, 'border-color': dataBorderColor, 'border-radius': dataBorderRadius});
				$(this).css({'width': dataWidth, 'height': dataHeight, 'font-family': '"' + dataFont + '"'});	
			});
			
			if (pinSrc.indexOf('images/icons/2') >= 0)
			{
				$(this).find('.imapper-content').css('height', '75px');
				if ($(this).find('.imapper' + id + '-value-item-open-position').html() != 'left' && $(this).find('.imapper' + id + '-value-item-open-position').html() != 'right')
				{
					$(this).attr('data-open-position', 'right');
					$(this).find('.imapper' + id + '-value-item-open-position').html('right');
				}
					
				$(this).find('.imapper-content-wrapper').append('<div class="triangle-' + $(this).attr('data-open-position') + '-border imapper-triangle-border"></div>');
			}
			else
				$(this).find('.imapper-content-wrapper').append('<div class="arrow-' + dataOpenPosition + '-border imapper-arrow-border"></div>');
			
			if (dataTabNumber > 1)
				for (var i = 1; i <= dataTabNumber; i++)
				{
					if (i == 1)
					{
						var after = '#imapper' + id + '-pin' + pinId + '-content';
						var contentTab = '-content';
					}
					else
					{
						var after = '#imapper' + id + '-pin' + pinId + '-content-' + i;
						var contentTab = '-content-' + i;
					}
					
					$('<div id="imapper' + id + '-pin' + pinId + contentTab + '-tab" class="imapper-content-tab" style="background-color: ' + dataBackColor + 
						';"><a href="#" style="color: ' + dataBorderColor + ';">' + i + '</a></div>').insertAfter(after);
				}
						
			if (pinSrc.indexOf('images/icons/3/') >= 0)
				$(this).prepend('<img id="imapper' + id + '-pin' + pinId + '" class="imapper-pin-shadow" src="' + pinSrc.substring(0, pinSrc.length - 5) + '1-1.png">')
				
			if (pinSrc.indexOf('images/icons/5/') >= 0)
			{
				$(this).prepend('<i id="imapper' + id + '-pin' + pinId + '-icon" class="imapper-pin-icon fawesome icon-large ' + dataPinIcon + '"></i>');
				$(this).prepend('<div id="imapper' + id + '-pin' + pinId + '-color" class="imapper-pin-color" style="background-color: ' + dataPinColor + ';"></div>');
			}
		});
	}
	
})(jQuery);