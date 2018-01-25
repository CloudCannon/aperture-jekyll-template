(function() {
	var $overlay = $(".overlay"),
		$overlayImage = $overlay.find("img"),
		$caption = $overlay.find('.caption'),
		$body = $("body"),
		$close = $overlay.find('.close'),
		$next = $overlay.find('.next'),
		$prev = $overlay.find('.prev'),
		$gallery = $(".gallery"),
		fadeTime = 200;

	$gallery.after('<ul class="cache"></ul>');

	var $cache = $(".cache");

	var addToCache = function(src) {
		if ($cache.find('img[src="' + src + '"]').length < 1) {
			$cache.append('<li><img src="' + src + '"></li>');
		}
	},

	changeEvent = function() {
		var $this = $gallery.find('a[data-id="' + window.location.hash + '"]');
		if ($this.length == 1) {
			var index = $this.parent().index();
			$overlayImage.fadeOut(fadeTime, function() {
				$overlayImage.attr("src", $this.attr("href")).fadeIn(fadeTime);
				$caption.html($this.attr("data-caption"));
			});
			$body.addClass("overlay-active");



			if (index > 0) {
				var $prevEl = $gallery.children().eq(index - 1).find('a');
				$prev.attr('href', $prevEl.attr('data-id')).show();
				addToCache($prevEl.attr('href'));
			} else {
				$prev.hide();
			}

			if (index < $gallery.find("a:last").parent().index()) {
				var $nextEl = $gallery.children().eq(index + 1).find('a');
				$next.attr('href', $nextEl.attr('data-id')).show();
				addToCache($nextEl.attr('href'));
			} else {
				$next.hide();
			}

			addToCache($this.attr("href"));
		} else {
			$body.removeClass("overlay-active");
			$overlayImage.attr("src", "");
		}
	},

	changeHash = function(hash) {
		history.replaceState(undefined, undefined, hash);
		changeEvent();
	};

	$close.click(function() {
		changeHash("#");
	});

	$prev.click(function() {
		changeHash($prev.attr('href'));
		return false;
	});

	$next.click(function() {
		changeHash($next.attr('href'));
		return false;
	});

	$gallery.find("a").click(function(e){
		var $this = $(this);
		changeHash($this.attr('data-id'));
		return false;
	});

	$(document).keyup(function(e) {
		 switch(e.which) {
				case 37: // left
				if (($prev).is(':visible')) {
					changeHash($prev.attr("href"));
				}
				break;

				case 39: // right
				if (($next).is(':visible')) {
					changeHash($next.attr("href"));
				}
				break;

				case 27: // escape
				 changeHash("#");
				break;

				default: return; // exit this handler for other keys
		}
		e.preventDefault();
	});

	changeEvent();
})();