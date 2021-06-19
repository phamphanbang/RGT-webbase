var item = {};
var id = sessionStorage.getItem("curent-id");

let renderProduct = () => {
    fetch('http://localhost:3000/product')
    .then(response => {
        if(!response.ok){
            throw Error('ERROR');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        //let id = sessionStorage.getItem("curent-id")
        item = data.find(i => i.id==id);
        console.log(item);
        $(".dptr-title").after('<h3>'+item.product_name+'</h3>')
        $(".price").append('<i class="fas fa-euro-sign"></i>'+item.product_price);
        $(".price-detail").append('<p>Product code : '+item.id +'<br>Availability : In Stock </p>')
    })
    .then(()=>{
        
        $(".add-to-cart").click(function () {
            var cart = JSON.parse(localStorage.getItem("cart"));
            if(cart == null) cart = [];
            let temp = cart.find(i => i.id == id);
            if(!temp){
                var addToCart = {
                    "id" : item.id,
                    "product_name" : item.product_name,
                    "product_price" : item.product_price,
                    "count" : 1
                }
                cart.push(addToCart);
            }
            else {
                cart.map(i => i.id==id?i.count++:i);
            }
            console.log(cart);
            localStorage.setItem("cart",JSON.stringify(cart));
        });
        
    })
}


renderProduct();

$(document).ready(function () {
    console.log('doc ready');
    
});







