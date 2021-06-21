let renderCart = () => {
    console.log(1);
    var cart = JSON.parse(localStorage.getItem("cart"));
    if(cart == null) cart = [];
    let html = `<div class="row cart-row">
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
        return `<div class="row cart-row" id="${item.id}">
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
                <button class="btn decrease-count" type="button">
                    <i class="fas fa-chevron-left "></i>
                </button>
                <input type="number" class="form-control item-count" value="${item.count}" >
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
        cart = cart.map(i => i.id==id?newItem:i);
        localStorage.setItem("cart",JSON.stringify(cart));
        console.log(cart);
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
        cart = cart.map(i => i.id==id?newItem:i);
        localStorage.setItem("cart",JSON.stringify(cart));
        console.log(cart);
        }
        else if (item.count <= 1) {
            let check = confirm("Do you want to remove this item from cart ?");
            if (check){
                let removeId = "#" + id.toString();
                cart = cart.filter(i => i.id != id);
                $(removeId).remove();
                localStorage.setItem("cart",JSON.stringify(cart));
            }
        }
    });
    $(".item-delete").click(function (e) { 
        let id = $(this).closest('.cart-row').attr('id');
        let check = confirm("Do you want to remove this item from cart ?");
        if (check){
            let removeId = "#" + id.toString();
            cart = cart.filter(i => i.id != id);
            $(removeId).remove();
            localStorage.setItem("cart",JSON.stringify(cart));
        }
    });
}

renderCart();

