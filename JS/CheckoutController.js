var checkout = JSON.parse(localStorage.getItem("checkout"));

let renderCheckout = () => {
	if(checkout) {
		$("#your-cart").text(checkout.yourCart);
    	$("#vat").text(checkout.vat);
    	$("#order-total").text(checkout.orderTotal);
	}
}



$(document).ready(function () {
    // $("#shipping-email").on("change", function () {
	// 	console.log(this.value)
	// });
	renderCheckout();
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

		jQuery.validator.addMethod("onlyNumber", function(value, element) {
			// allow any non-whitespace characters as the host part
			return this.optional( element ) || /^[0-9]*$/.test( value );
		}, 'Please enter a valid number.');

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
				  error.insertAfter(element.parent("div"));
				  console.log("time" + JSON.stringify(element.attr("id")));
				} 
				if (element.attr("name") == "fname" || element.attr("name") == "sname" ) {
					error.insertAfter("#sname");
				} 
				if (element.attr("name") == "address1" || element.attr("name") == "address2" ) {
					error.insertAfter("#address2");
				} 
				if (element.attr("name") == "secured-code" ) {
					error.insertAfter(element.parent("div"));
				}
				if (element.attr("name") == "mobile" ) {
					error.insertAfter(element.parent("div"));
				}
				if (element.attr("name") == "email" ) {
					error.insertAfter(element);
				}
				if (element.attr("name") == "company" ) {
					error.insertAfter(element);
				}
				if (element.attr("name") == "postalCode" ) {
					error.insertAfter(element);
				}
				if (element.attr("name") == "city" ) {
					error.insertAfter(element);
				}
				if (element.attr("name") == "credit-card" ) {
					error.insertAfter(element);
				}
				if (element.attr("name") == "name-of-card" ) {
					error.insertAfter(element);
				}
				if (element.attr("name") == "state" ) {
					error.insertAfter(element);
				}
				if (element.attr("name") == "province" ) {
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
					onlyNumber: true
				},
				"city": {
					required: true,
				},
				"mobile": {
					required: true,
					onlyNumber: true
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