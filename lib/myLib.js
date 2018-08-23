const countQuantity = function countQuantityProductsInOrders(orders) {
  let allProducts = [];

  orders.map(product => {
    let isInArray = allProducts.find(element => {
      return element.ean === product.ean;
    });

    if (isInArray) {
      isInArray.quantity += product.quantity;
      isInArray.totalPrice += product.totalPrice;
    } else {
      allProducts.push(product);
    }
  });

  return allProducts;
};

module.exports = { countQuantity };
