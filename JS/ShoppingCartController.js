

var allData = [];


let renderAllProduct = () => {
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
        const html = data.map(item => {
            return `
            <div class="product-item be-removed" >
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
        //document.querySelector('#main-product')
        //        .insertAdjacentHTML("afterbegin",html)
        $("#main-product").append(html);
    })
    .then(()=>{
        $(".add-to-cart").click(function () {
            let id = $(this).closest('.item-hover').attr('id');
            
            var cart = JSON.parse(localStorage.getItem("cart"));
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
            alert("Product added !");
        });
        $(".go-to-detail").click(function () {
            let id = $(this).closest('.item-hover').attr('id');
            sessionStorage.setItem("curent-id",id);
        });
        $(".sort-by-select").change(function (e) { 
            console.log(1)
            let type = $(this).val().toString();
            let ordBy = $(".togle").attr("name").toString();
            console.log(type,ordBy);
            tempData(type,ordBy);
            Sort();
        });
        $(".sort-by-click").click(function (e) { 
            let type = $(".sort-by-select").val().toString();
            let ordBy = $(".togle").attr("name").toString();
            console.log(2)
            tempData(type,ordBy);
            $(".sort-by-click > i").toggleClass("togle")
            Sort();
        });
    })
}

let tempData = (type,ordBy) => {
    if (type == "id" && ordBy == "decs") {
        return allData.sort((x,y) => {
            return  ((x.id < y.id) ? -1 : ((x.id > y.id) ? 1 : 0));
        } );}
    if (type == "id" && ordBy == "acs") {
        return allData.sort((x,y) => {
            return  ((x.id > y.id) ? -1 : ((x.id < y.id) ? 1 : 0));
        });}
    if (type == "product-name" && ordBy == "decs") {
        return allData.sort((x,y) => {
            return  ((x.product_name.toUpperCase() < y.product_name.toUpperCase()) ? -1 : ((x.product_name.toUpperCase() > y.product_name.toUpperCase()) ? 1 : 0));
        });}
    if (type == "product-name" && ordBy == "acs") {
        return allData.sort((x,y) => {
            return  ((x.product_name.toUpperCase() > y.product_name.toUpperCase()) ? -1 : ((x.product_name.toUpperCase() < y.product_name.toUpperCase()) ? 1 : 0));
        });}
    if (type == "product-price" && ordBy == "decs") {
        return allData.sort((x,y) => {
            return  ((x.product_price < y.product_price) ? -1 : ((x.product_price > y.product_price) ? 1 : 0));
        });}
    if (type == "product-price" && ordBy == "acs") {
        return allData.sort((x,y) => {
            return  ((x.product_price > y.product_price) ? -1 : ((x.product_price < y.product_price) ? 1 : 0));
        });}

}

let Sort = () => {
    console.log(allData);
    $(".be-removed").remove();
    console.log("???")
    const html = allData.map(item => {
        return `
        <div class="product-item be-removed" >
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
    //document.querySelector('#main-product')
    //        .insertAdjacentHTML("afterbegin",html)
    console.log(123);
    $("#main-product").append(html);
    $(".add-to-cart").click(function () {
        let id = $(this).closest('.item-hover').attr('id');
        
        var cart = JSON.parse(localStorage.getItem("cart"));
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
        alert("Product added !");
    });
    $(".go-to-detail").click(function () {
        let id = $(this).closest('.item-hover').attr('id');
        sessionStorage.setItem("curent-id",id);
    })

}


renderAllProduct();



