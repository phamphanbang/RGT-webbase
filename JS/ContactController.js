$(document).ready(function () {
    $("#thisIsAForm").validate({
        debug : true,
        rules: {
            fullname :{
                required: true
            },
            email :{
                required: true,
                email: true
            },
            company :{
                required: true
            },
            subject : {
                required:true
            }
        }
    })
});