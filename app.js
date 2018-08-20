const Koa = require("koa");
const fetch = require("node-fetch");


const app = new Koa();

app.use(async ctx => {
    const res = await fetch('https://api.github.com/users/github');
    const json = await res.json();
    ctx.body = json;
})

app.listen(3000,() => {
    console.log("server start");
})