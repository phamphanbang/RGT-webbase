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
                <a href="#" class="btn" role="button" >
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
            let item = allData.find(i => i.id == id);
            var cart = JSON.parse(localStorage.getItem("cart"));
            if(cart == null) cart = [];
            let temp = cart.find(i => i.id == id);
            let count = temp ? temp.id : 1;
            var addToCart = {
                "id" : item.id,
                "product_name" : item.product_name,
                "product_price" : item.product_price,
                "count" : count
            }
            cart.push(addToCart);
            console.log(cart);
            localStorage.setItem("cart",JSON.stringify(cart));
        });
    })
}

renderAllProduct();

// $(document).ready(function () {
//     $(".add-to-cart").click(function () {
//         console.log("activate");
//         let id = $(this).closest('.item-hover').attr('id');
//         let item = allData.find(i => i.id == id);
//         var cart = JSON.parse(localStorage.getItem("cart"));
//         if(cart == null) cart = [];
//         let temp = cart.find(i => i.id == id);
//         let count = temp ? temp.id : 1;
//         var addToCart = {
//             "id" : item.id,
//             "product_name" : item.product_name,
//             "product_price" : item.product_price,
//             "count" : count
//         }
//         cart.push(addToCart);
//         console.log(cart);
//         localStorage.setItem("cart",JSON.stringify(cart));
//     });
// });

// $(document).on('click','.add-to-cart',function () {
//     $(".add-to-cart").click(function () {
//         console.log("activate");
//         console.log(allData);
//         let id = $(this).closest('.item-hover').attr('id');
//         let item = allData.find(i => i.id == id);
//         console.log(item , "  " , id);
//         var cart = JSON.parse(localStorage.getItem("cart"));
//         if(cart == null) cart = [];
//         let temp = cart.find(i => i.id == id);
//         let count = temp ? temp.id : 1;
//         var addToCart = {
//             "id" : item.id,
//             "product_name" : item.product_name,
//             "product_price" : item.product_price,
//             "count" : count
//         }
//         cart.push(addToCart);
//         console.log(cart);
//         localStorage.setItem("cart",JSON.stringify(cart));
//     });
// });






