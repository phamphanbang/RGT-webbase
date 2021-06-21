$(document).ready(function () {
    // $("#shipping-email").on("change", function () {
	// 	console.log(this.value)
	// });
	$().ready(function() {
		$("#login-form").validate({
			debug: true,
			rules:{
				"mid-email" : {
					required: true
				},
				"password": {
					required: true
				}
			}
		});

		$("#form-validate").validate({
			debug:true,	
			success : "valid",
			errorElement: "div",
			groups: {
				time: "year day-month",
				fullname : "fname sname",
				addr : "address1 address2"
			  },
			  errorPlacement: function(error, element) {
				if (element.attr("name") == "year" || element.attr("name") == "day-month" ) {
				  error.insertAfter("#check");
				  console.log("time" + JSON.stringify(element.attr("id")));
				} 
				if (element.attr("name") == "fname" || element.attr("name") == "sname" ) {
					error.insertAfter("#sname");
				} 
				if (element.attr("name") == "address1" || element.attr("name") == "address2" ) {
					error.insertAfter("#address2");
				} 
				else {
					error.insertAfter(element);
				}
			  },		
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