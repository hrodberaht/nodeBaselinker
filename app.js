const Koa = require("koa");
const fetch = require("node-fetch");

const { token } = require("./config");
const { countQuantity } = require("./lib/myLib");

const app = new Koa();

app.use(async ctx => {
  const res = await fetch("https://api.baselinker.com/connector.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `token=${token}&method=getOrders&parameters={"status_id": 50041}`
  });
  const json = await res.json();

  const products = [];
  json.orders.map(prods => {
    prods.products.map(prods => {
      products.push(prods);
    });
  });

  if (products.length === 0) {
    return (ctx.body = { message: "Brak produktów w katgorii" });
  }

  let eans = [];
  products.forEach(prod => {
    eans.push({
      name: prod.name,
      ean: prod.ean,
      quantity: prod.quantity,
      totalPrice: prod.price_brutto * prod.quantity
    });
  });

  //count total price of all products

  quantity = countQuantity(eans);

  totalPriceOrders = 0;
  quantity.forEach((data) => {
    totalPriceOrders += data.totalPrice;
  })

  ctx.body = totalPriceOrders;
});

app.listen(3000, () => {
  console.log("server start");
});
