const Koa = require("koa");
const fetch = require("node-fetch");

const config = require("./config");

const app = new Koa();

const { token } = config;


app.use(async ctx => {
    const res = await fetch('https://api.baselinker.com/connector.php',
    {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `token=${token}&method=getOrders&parameters={"status_id": 50041}`
    });
    const json = await res.json();

    const products = [];
    json.orders.map((prods) => {
        prods.products.map( (prods)=> {
            products.push(prods)
        })
    })

    let eans = [];
    products.forEach((prod)=>{
        eans.push({
            name: prod.name,
            ean: prod.ean,
            quantity: prod.quantity,
            totalPrice: prod.price_brutto*prod.quantity

        })
    })
    let eansCopy = []
    eans.map((x)=> {
        eansCopy.push(x);
    })
    let allProducts = [];
    for (let i = 0; i < eans.length; i++) {
        let product = {
            ean: eans[i].ean,
            quantity: 0
        }
        for (let j = 0; j < eansCopy.length; j++) {
            if(eans[i].ean === product.ean){
                product.quantity += eans[j].quantity
            }
        }
        allProducts.push(product);
    }
    // eans.map((prod)=> {
    //     eans.forEach((all)=>{
    //         if(prod.ean === all.ean){
    //            console.log(`${all.ean}:${prod.quantity+all.quantity}`)
    //         }
    //     })
    //     allProducts.push(prod);
    // })
    ctx.body = allProducts;
})

app.listen(3000,() => {
    console.log("server start");
})