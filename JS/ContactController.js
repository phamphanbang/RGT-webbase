$(document).ready(function () {
    $("#thisIsAForm").validate({
        debug : true,
        rules: {
            fullname :{
                required: true
            },
            email :{
                required: true
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