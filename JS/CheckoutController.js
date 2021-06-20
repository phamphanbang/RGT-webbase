$(document).ready(function () {
    console.log("init this shit")
    $("#shipping-valid").validate({
		onfocusout: true,
		onkeyup: true,
		onclick: true,
		rules: {
			"email": {
				required: true,
				maxlength: 15
			},
			"fname": {
				required: true,
				minlength: 8
			},
			"sname": {
				equalTo: true,
				minlength: 8
			}
		}
	});
});