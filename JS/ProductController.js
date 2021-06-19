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
        const html = data.map(item => {
            return `
            <div class="product-item">
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
            </div>
            `     
        }).join("");
        //document.querySelector('#main-product')
        //        .insertAdjacentHTML("afterbegin",html)
        $("#main-product").append(html);
    })
    
}

renderAllProduct();
