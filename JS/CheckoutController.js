$(document).ready(function () {
    // $("#shipping-email").on("change", function () {
	// 	console.log(this.value)
	// });
	$().ready(function() {
		$("#form-validate").validate({
			debug:true,	
			success : "valid",		
			rules: {
				"email": {
					required: true,
					email : true
				},
				"fname": {
					required: true,
				},
				"sname": {
					required: true,
				},
				"company": {
					required: true,
				},
				"address1": {
					required: true,
				},
				"address2": {
					required: true,
				},
				"postalCode": {
					required: true,
				},
				"city": {
					required: true,
				},
				"mobile": {
					required: true,
				},
				"credit-card": {
					required: true,
				},
				"secured-code": {
					required: true,
				},
				"name-of-card": {
					required: true,
				},
				"state":{
					required:true,
				},
				"province" : {
					required:true
				},
				"day-month" : {
					required: true,
				},
				"year":{
					required: true
				}
			}
			
		});
	});
});