$(document).ready(function () {	
	$('#other').hide();
	$('#yrBtn').addClass('active');
	$('#yrBtn').click(function () {
		$('#other').hide();
		$('#years').show();
		$('#yrBtn').addClass("active");
		$('#otherBtn').removeClass("active");
		return false;
	});
	$('#otherBtn').click(function () {
		$('#years').hide();
		$('#other').show();
		$('#yrBtn').removeClass("active");
		$('#otherBtn').addClass("active");
		return false;
	});
	
});
