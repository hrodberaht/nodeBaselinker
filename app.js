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
        body: `token=${token}&method=getOrders&parameters={"status_id": 30594}`
    });
    const json = await res.json();
    ctx.body = json.orders;
})

app.listen(3000,() => {
    console.log("server start");
})