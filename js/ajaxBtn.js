$(document).ready(function() {
	$('.top-btn').click(function() {
		content_ref = $(this).attr('href') + ' .content';
		$('.content').load(content_ref);
		return false;
	});

});