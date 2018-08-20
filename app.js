const Koa = require("koa");
const fetch = require("node-fetch");

const config = require("./config");

const app = new Koa();

const { token } = config;
const products = [];

app.use(async ctx => {
    const res = await fetch('https://api.baselinker.com/connector.php',
    {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `token=${token}&method=getOrders&parameters={"status_id": 50041}`
    });
    const json = await res.json();

    json.orders.map((prods) => {
        prods.products.map( (prods)=> {
            products.push(prods)
        })
    })

    let eans = [];
    products.map((prod)=>{
        eans.push({
            name: prod.name,
            ean: prod.ean,
            quantity: prod.quantity,
            totalPrice: prod.price_brutto*prod.quantity

        })
    })
    ctx.body = eans;
})

app.listen(3000,() => {
    console.log("server start");
})