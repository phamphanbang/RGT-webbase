var cart = [];
var allData = [];
var isItemAdded = false;
var checkout = {};

let itemChange = () => {
    let yourCart = 0;
    let vat = 0;
    let orderTotal = 0;
    cart.forEach(item => {
        yourCart += (item.product_price*item.count);
        vat = yourCart/10;
    });
    orderTotal=yourCart+vat;
    $("#your-cart").text(yourCart);
    $("#vat").text(vat);
    $("#order-total").text(orderTotal);
}

let renderCart = () => {
    console.log(1);
    cart = JSON.parse(localStorage.getItem("cart"));
    if(cart == null) cart = [];
    let html = `<div class="row cart-row be-removed">
    <div class="col-4 cart-title">
        <p>PRODUCT NAME</p>
    </div>
    <div class="col-2 cart-title">
        <p>UNIT PRICE</p>
    </div>
    <div class="col-3 cart-title">
        <p>QTY</p>
    </div>
    <div class="col-2 cart-title">
        <p>SUBTOTAL</p>
    </div>
    </div>`;
    html += cart.map(item => {
        return `<div class="row cart-row be-removed" id="${item.id}">
        <div class="col-4">
            <div class="cart-product-detail">
                <div class="cart-product-img">
                    <img src="https://picsum.photos/80/140" alt="a beautiful beach"
                    class="figure-img img-fluid ">
                </div>
                <div class="cart-product-description">
                    <div class="cart-product-name">
                        <p>${item.product_name}</p>
                    </div>
                    <div class="cart-product-info">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque fugit beatae rerum si
                        </p>
                    </div>
                    <div class="cart-product-social">
                        <i class="fab fa-facebook-f"></i>
                        <i class="fab fa-twitter"></i>
                        <i class="fab fa-pinterest-p"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-2">
            <div class="cart-product-price">
                <i class="fas fa-euro-sign"></i>
                <p>${item.product_price}</p>
            </div>                                      
        </div>
        <div class="col-3">
            <div class="input-group">
                <button class="btn decrease-count ${item.count==1?"disabled":""}" type="button">
                    <i class="fas fa-chevron-left "></i>
                </button>
                <input type="number" class="form-control item-count" name="item-count" id="item-count" min="1" value="${item.count}" >
                <button class="btn increase-count" type="button">
                    <i class="fas fa-chevron-right "></i>
                </button>
              </div>
        </div>
        <div class="col-2">
            <div class="cart-product-subtotal">
                <i class="fas fa-euro-sign"></i>
                <p id="subtotal-price-${item.id}">${item.product_price * item.count}</p>
                <button class="btn item-delete" type="button">
                    <i class="fas fa-times "></i>
                </button>
                
            </div> 
        </div>
    </div>`
    }).join("");
    itemChange();
    $(".cart-container").prepend(html);
    $(".increase-count").click(function (e) { 
        let id = $(this).closest('.cart-row').attr('id');
        
        let item = cart.find(i => i.id ==id);
        $(this).siblings(".item-count").val((++item.count).toString());
        let subPriceId = "#subtotal-price-" + item.id.toString();
        
        $(subPriceId).text((item.product_price * item.count).toString());
        let newItem = {
            "id" : item.id,
            "product_name" : item.product_name,
            "product_price" : item.product_price,
            "count" : item.count
        }
        if(item.count>1) $(this).siblings(".decrease-count").removeClass("disabled");
        cart = cart.map(i => i.id==id?newItem:i);
        // localStorage.setItem("cart",JSON.stringify(cart));
        // console.log(cart);
        isItemAdded = false;
        itemChange();
    });
    $(".decrease-count").click(function (e) { 
        let id = $(this).closest('.cart-row').attr('id');
        console.log(id);
        let item = cart.find(i => i.id ==id);
        
        console.log(item);
        if(item.count > 1) {
            $(this).siblings(".item-count").val((--item.count).toString());
            let subPriceId = "#subtotal-price-" + item.id.toString();
        
            $(subPriceId).text((item.product_price * item.count).toString());
            let newItem = {
                "id" : item.id,
                "product_name" : item.product_name,
                "product_price" : item.product_price,
                "count" : item.count
            }
            if(item.count==1) $(this).addClass("disabled");
        cart = cart.map(i => i.id==id?newItem:i);
        // localStorage.setItem("cart",JSON.stringify(cart));
        // console.log(cart);
        itemChange();
        isItemAdded = false
        }
        else if (item.count <= 1) {
            let check = confirm("Do you want to remove this item from cart ?");
            if (check){
                let removeId = "#" + id.toString();
                cart = cart.filter(i => i.id != id);
                $(removeId).remove();
                itemChange();
                isItemAdded = false
                // localStorage.setItem("cart",JSON.stringify(cart));
            }
        }
    });
    $(".item-count").change(function (e) { 
        let id = $(this).closest('.cart-row').attr('id');
        
        let item = cart.find(i => i.id ==id);
        let newCount =parseInt($(this).val());
        console.log(newCount);
        let subPriceId = "#subtotal-price-" + item.id.toString();
        
        $(subPriceId).text((item.product_price * newCount).toString());
        let newItem = {
            "id" : item.id,
            "product_name" : item.product_name,
            "product_price" : item.product_price,
            "count" : newCount
        }
        if(newCount>1) $(this).siblings(".decrease-count").removeClass("disabled");
        if(newCount<=1) $(this).siblings(".decrease-count").addClass("disabled");
        cart = cart.map(i => i.id==id?newItem:i);
        // localStorage.setItem("cart",JSON.stringify(cart));
        // console.log(cart);
        itemChange();
        isItemAdded = false
    });
    $(".item-delete").click(function (e) { 
        let id = $(this).closest('.cart-row').attr('id');
        // let check = confirm("Do you want to remove this item from cart ?");
        // if (check){
        //     let removeId = "#" + id.toString();
        //     cart = cart.filter(i => i.id != id);
        //     $(removeId).remove();
        //     localStorage.setItem("cart",JSON.stringify(cart));
        //     itemChange();
        // }
        let removeId = "#" + id.toString();
        cart = cart.filter(i => i.id != id);
        $(removeId).remove();
        //localStorage.setItem("cart",JSON.stringify(cart));
        itemChange();
        isItemAdded = false
    });
    
}

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
        allData=data;
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
            let id = $(this).closest('.item-hover').attr('id');
            
            //var cart = JSON.parse(localStorage.getItem("cart"));
            if(cart == null) cart = [];
            let temp = cart.find(i => i.id == id);
            if(!temp){
                let item = allData.find(i => i.id == id);
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
            isItemAdded = true;
            $(".be-removed").remove();
            renderCart();
            alert("Added to cart!!!")
        });
        $(".go-to-detail").click(function () {
            let id = $(this).closest('.item-hover').attr('id');
            sessionStorage.setItem("curent-id",id);
        })
        
    })
}

renderCart();
renderProduct();
$(".update-cart").click(function (e) {
    let check = confirm("Do you want to update your cart ?");
    if (check){
        checkout = {
            "yourCart" : $("#your-cart").text(),
            "vat" : $("#vat").text(),
            "orderTotal" : $("#order-total").text(),
            "cart" : cart
        }
        localStorage.setItem("checkout",JSON.stringify(checkout));
        localStorage.setItem("cart",JSON.stringify(cart));
        alert("Your cart is now up-to-date");
    }
    
});

// $("#checkout").click(function (e) { 
//     let checkout = {
//         "yourCart" : $("#your-cart").text(),
//         "vat" : $("#vat").text(),
//         "orderTotal" : $("#order-total").text(),
//         "cart" : cart
//     }
//     localStorage.setItem("checkout",JSON.stringify(checkout));
//     alert("go-to-checkout");
// });

