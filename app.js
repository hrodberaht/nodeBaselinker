const Koa = require("koa");
const fetch = require("node-fetch");

const config = require("./config");

const app = new Koa();

const { token } = config;

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
    return (ctx.body = { message: "Brak produktów w katgori" });
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

  let allProducts = [];
  for (let i = 0; i < eans.length; i++) {
    let productCopy = {
      ean: eans[i].ean,
      quantity: eans[i].quantity
    };

    if (allProducts.length === 0) {
      allProducts.push(productCopy);
    } else {
      for (let j = 0; j < allProducts.length; j++) {
        if (allProducts[j].ean === productCopy.ean) {
          allProducts[j].quantity += productCopy.quantity;
          break;
        } else {
          allProducts.push(productCopy);
          break;
        }
        console.log(productCopy);
      }
    }
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
});

app.listen(3000, () => {
  console.log("server start");
});
