const products = require('./allProducts');

let eans = [{}];

// fiter every eans thats lover than 3003407228990
const lowerThanEan = 3003407228990;
let eansAfterFilter = products.filter((product) => {
    return +product.ean < lowerThanEan
})



eansAfterFilter.forEach(element => {
    const isInArray = eans.find((product) => {
        return product.name === element.name
    });

    if (isInArray) {
        return isInArray.eans.push(element.ean);
    } else {
        return eans.push({
            ean: 'testEan',
            name: element.name,
            eans: [element.ean]
        })
    }
});


//console.log(eansAfterFilter);
console.log(eans);
