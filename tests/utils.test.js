const mocha = require("mocha");
const chai = require("chai");
const utils = require("../utils");
const expect = chai.expect;

// ========================================================
// NOTE: https://mochajs.org/#arrow-functions
// Passing arrow functions (“lambdas”) to Mocha is discouraged.
// Lambdas lexically bind this and cannot access the Mocha context.
// ========================================================

it("should say hello", function() {
  const hello = utils.sayHello();
  expect(hello).to.be.a("string");
  expect(hello).to.equal("Hello");
  expect(hello).with.lengthOf(5);
});

// ========================================================
// Level 1 Challenges
// ========================================================

it("should return the area of a 5 by 6 rectangle", function() {
    const area = utils.area(5, 6);
    expect(area).to.be.a('Number');
    expect(area).to.equal(5 * 6);
});

it("should return the are of a circle of radius 5", function() {
    const circleArea = utils.circleArea(5);
    expect(circleArea).to.be.a('Number');
    expect(circleArea).to.equal(Math.PI * 5 * 5)
});

// ========================================================
// Level 2 Challenges
// ========================================================
// NOTE: The following unimplemented test cases are examples
// of "Pending Tests" in Chai. Someone should write these
// tests eventually.
// ========================================================

const shoppingCart = function() {

    return {
        items: [],
        length: function() {
            return this.items.length
        },
        add: function(item) {
            this.items.push(item);
        },
        remove: function(itemToRemove) {
            this.items = this.items.filter(function(currentItem, index, arr) {
                return currentItem.name !== itemToRemove.name
            })
        },
        getTotal: function() {
            let total = 0 
            for (let item in this.items) {
                total += this.items[item].price
            }
            return total
        }
    }
}

//generate an item
const genItem = function(name, price) {
    return {
        name: name,
        price: price
    }
}

it("Should create a new (object) Item with name and price", function() {
    const cart = shoppingCart(); 
    const item = genItem('Banana', 25)

    cart.add(item)

    //Make sure the list inserted correctly 
    expect(cart.items).to.include(item)
    expect(cart.items.length).to.be.a('Number');
    expect(cart.items.length).to.equal(1);
    
    //check the name property
    expect(cart.items[0]).to.have.property('name');
    expect(cart.items[0].name).to.be.a('string')
    expect(cart.items[0].name).to.equal(item.name);
    
    //check the price property
    expect(cart.items[0]).to.have.property('price');
    expect(cart.items[0].price).to.be.a('Number');
    expect(cart.items[0].price).to.equal(item.price);
    
});

it("Should return an array containing all items in cart", function() {
    const cart = shoppingCart();
    const items =[
        genItem('Banana', 25),
        genItem('Bread', 2),
        genItem('Ice cream'),
    ]   

    //Add items to the cart
    for (let item in items) {
        cart.add(items[item]);
    }
    
    //make sure that the length of our cart is equal to the items we've appended
    expect(cart.length()).to.be.a('Number');
    expect(cart.length()).to.equal(3);

    //Make sure that the items property is an array
    expect(cart.items).to.be.a('Array');
    for (let item in items) {
        expect(cart.items[item]).to.be.a('Object');
        expect(cart.items[item]).to.equal(items[item])
    }
});

it("Should add a new item to the shopping cart", function() {
    const cart = shoppingCart();
    const item = genItem('Dog', 1);

    cart.add(item);

    //Make sure the cart is adding items properly
    expect(cart.items).to.be.a('Array');
    expect(cart.length()).to.equal(1);

    //Check the name of the added item
    expect(cart.items[0]).to.be.a('Object');
    expect(cart.items[0]).to.have.property('name');
    expect(cart.items[0].name).to.equal(item.name);
    
    //Check the price of the added item 
    expect(cart.items[0]).to.have.property('price');
    expect(cart.items[0].price).to.be.a('Number')
    expect(cart.items[0].price).to.equal(item.price)
});

it("Should return the number of items in the cart", function() {
    const cart = shoppingCart();
    const item = genItem('Soi', 999);
    
    //Check the lenght of the cart before and after items have been inserted into the list
    expect(cart.length()).to.equal(0);
    cart.add(item);
    expect(cart.length()).to.equal(1)
});

it("Should remove items from cart", function() {
    const cart = shoppingCart();
    const item = genItem('Nannn', 100);

    //Insert the item into the cart
    cart.add(item);
    expect(cart.length()).to.equal(1);

    //Remove the item from the cart and make sure that it is empty
    cart.remove(item);
    expect(cart.length()).to.equal(0);
});

// ========================================================
// Stretch Challenges
// ========================================================

it("Should update the count of items in the cart", function() {
    const cart = shoppingCart();
    const item = genItem('asim', 43);

    //check the length pre and post insert
    expect(cart.length()).to.equal(0);
    cart.add(item);
    expect(cart.length()).to.equal(1);
});

it("Should validate that an empty cart should return 0 ", function() {
    const cart = shoppingCart();
    const item = genItem('tim', -5000);

    //Add item and make sure that gets added
    cart.add(item)
    expect(cart.length()).to.equal(1);

    //Remove item and make sure that it is empty
    cart.remove(item);
    expect(cart.length()).to.equal(0);
});

it("Should return the total cost of all items in the cart", function() {
    const cart = shoppingCart();
    const items = [
        genItem('Seve', 365),
        genItem('S33V', 365 * 3),
        genItem('Severiano', 365*5)
    ]
    let price = 0
    
    //Add items to the cart and calculate the sum
    for (let item in items) {
        cart.add(items[item])
        price += items[item].price
    }

    const total = cart.getTotal();

    expect(total).to.equal(price);
});
