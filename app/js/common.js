window.onload = function() {
	var subscribe = [];
	var start = 0;
	var percent = 0;
	var str = 'onoffswitch__item1';
	var check = 'checkbox';
	var height = $('html').height();

	$('.overlay').css({'height' : height});

	$.getJSON('/js/subscribe.json', function(data) {
		for(var i = 0, j = 0; i < data.length; i++) {
			subscribe[i] = data[i];
			if(data[i]['subscribed'] == true) {
				percent += 100/6;
				$('.' + str.replace(/\d+/, ++j)).html('Subscrubed');
				$('.checkbox' +j).prop("checked", true);
			} else {
				$('.' + str.replace(/\d+/, ++j)).html('Unsubscribed');
			}
		}
		$('.percent').html(Math.floor(percent) + '%');
		$('.display__indicator').width(Math.floor(percent) + '%');
		start = Math.floor(percent);
});

	var site = function (x) {
		if(subscribe[x-1]['subscribed'] == true) {
			$('.onoffswitch__item' + x).html('Unsubscribed');
			percent -= 100/6;
			if (percent < 0) {
				percent = 0;
			}
			$('.percent').html(Math.floor(percent) + '%');
			$('.display__indicator').width(Math.floor(percent) + '%');
			subscribe[x-1]['subscribed'] = false;
		} else {
			$('.onoffswitch__item' + x).html('Subscribed');
			percent += 100/6;
			if (percent > 100) {
				percent = 100;
			}
			$('.percent').html(Math.floor(percent) + '%');
			$('.display__indicator').width(Math.floor(percent) + '%');
			subscribe[x-1]['subscribed'] = true;
		}
	}

	$('.site_1').click(function() {
		site(1);
	});

	$('.site_2').click(function() {
		site(2);
	});

	$('.site_3').click(function() {
		site(3);
	});

	$('.site_4').click(function() {
		site(4);
	});

	$('.site_5').click(function() {
		site(5);
	});

	$('.site_6').click(function() {
		site(6);
	});

	$('.footer__button1').click(function() {
		if (Math.floor(percent) > Math.floor(start)) {
			$('.popup__item2').html('+' + (Math.floor(percent) - Math.floor(start)) + '%');
			$('.popup__item2').css('color', '#f2a723');
			$('.popup__item3').html('more fun added');
			start = percent;
		} else if (Math.floor(percent) < Math.floor(start)){
			$('.popup__item2').html(Math.floor(percent) - Math.floor(start) + '%');
			$('.popup__item2').css('color', '#c34c4c');
			$('.popup__item3').html('fun lost :(');
			start = percent;
		} else {
			$('.popup__item2').html(Math.floor(percent) - Math.floor(start) + '%');
			$('.popup__item2').css('color', 'blue');
			$('.popup__item3').html('unchanged');
		}
		console.log(subscribe);
		$('.popup').show();
		$('.overlay').show();
	})

	$('.footer__button2').click(function() {
		percent_new = Math.floor(percent);
		percent = 0;
		for(var i = 0, j = 0; i < subscribe.length; i++) {
			subscribe[i]['subscribed'] = false;
			$('.' + str.replace(/\d+/, ++j)).html('Unsubscribed');
			$('.checkbox' +j).prop("checked", false);
			$('.percent').html(percent + '%');
			$('.display__indicator').width(percent + '%');
			if (percent_new > percent) {
				$('.popup__item2').html(percent - percent_new + '%');
				$('.popup__item2').css('color', '#c34c4c');
				$('.popup__item3').html('fun lost :(');
			} else {
				$('.popup__item2').html(percent - percent_new + '%');
				$('.popup__item2').css('color', 'blue');
				$('.popup__item3').html('unchanged');
			}
		}
		console.log(subscribe);
		$('.popup').show();
		$('.overlay').show();

	})

	$('.popup__button').click(function() {
		$('.popup').hide()
		$('.overlay').hide()
	})

}