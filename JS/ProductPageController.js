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
        $(".to").text(item.product_name);

        const subHtml = data.slice(0,3).map(item => {
            return `
            <div class="product-item" >
            <div class="product-img">
                <img src="https://picsum.photos/300/340" alt=""
                    class="figure-img img-fluid ">
            </div>
            <div class="product-description">
                <p>${item.product_name}</p>
                <div class="product-price">
                    $${item.product_price}
                </div>
            </div>
            <div class="item-hover" id="${item.id}">
                <a href="./productPage.html" class="btn go-to-detail" role="button" >
                    Detail
                </a>
                <button class="btn add-to-cart" >
                    Add to cart
                </button>
            </div>
            </div>
            `     
        }).join("");
        $("#also-like").append(subHtml);

        const subHtml2 = data.slice(-3).map(item => {
            return `
            <div class="product-item" >
            <div class="product-img">
                <img src="https://picsum.photos/300/340" alt=""
                    class="figure-img img-fluid ">
            </div>
            <div class="product-description">
                <p>${item.product_name}</p>
                <div class="product-price">
                    $${item.product_price}
                </div>
            </div>
            <div class="item-hover" id="${item.id}">
                <a href="./productPage.html" class="btn go-to-detail" role="button" >
                    Detail
                </a>
                <button class="btn add-to-cart" >
                    Add to cart
                </button>
            </div>
            </div>
            `     
        }).join("");
        $("#recently-viewed").append(subHtml2);
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
            alert("Product added !")
        });
        $(".go-to-detail").click(function () {
            let id = $(this).closest('.item-hover').attr('id');
            sessionStorage.setItem("curent-id",id);
        })
    })
}


renderProduct();

$(document).ready(function () {
    console.log('doc ready');
    
});







