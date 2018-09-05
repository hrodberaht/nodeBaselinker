const { countQuantity } = require("../lib/myLib");
const mock = [
  {
    name: "Pościel kołdra 120x90 90X120 poduszka do łóżeczka",
    ean: "5908249231740",
    quantity: 1,
    totalPrice: 34.5
  },
  {
    name: "Pościel kołdra 120x90 90X120 poduszka do łóżeczka",
    ean: "5908249231740",
    quantity: 1,
    totalPrice: 34.5
  },
  {
    name: "MATERAC MATERACYK PIANKOWY 60x120 60x120 łóżeczko",
    ean: "2003407228751",
    quantity: 1,
    totalPrice: 29.6
  },
  {
    name: "MATERAC MATERACYK PIANKOWY 60x120 60x120 łóżeczko",
    ean: "2003407228751",
    quantity: 1,
    totalPrice: 29.6
  }
];

// test("count quanity products from orders", () => {
//   expect(countQuantity(mock)[0].quantity).toBe(2);
// });

test("count totalPrice one type product from orders", () => {
  expect(countQuantity(mock)).toBe(69);
});
