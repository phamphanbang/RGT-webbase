
var IdDecs = (x,y) => {
    return  ((x.id < y.id) ? -1 : ((x.id > y.id) ? 1 : 0));
}

var IdAcs = (x,y) => {
    return  ((x.id > y.id) ? -1 : ((x.id < y.id) ? 1 : 0));
}

var NameDecs = (x,y) => {
    return  ((x.product_name < y.product_name) ? -1 : ((x.product_name > y.product_name) ? 1 : 0));
}

var NameAcs = (x,y) => {
    return  ((x.product_name > y.product_name) ? -1 : ((x.product_name < y.product_name) ? 1 : 0));
}

var PriceDecs = (x,y) => {
    return  ((x.product_price < y.product_price) ? -1 : ((x.product_price > y.product_price) ? 1 : 0));
}

var PriceAcs = (x,y) => {
    return  ((x.product_price > y.product_price) ? -1 : ((x.product_price < y.product_price) ? 1 : 0));
}

export {
    IdDecs,
    IdAcs,
    NameDecs,
    NameAcs,
    PriceDecs,
    PriceAcs
}