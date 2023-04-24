const fs = require("fs");

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.counter = 0;
    }

    addProduct(title, description, price, thumbnail, stock) {
        this.counter++;

        const productsArray = this.getProducts();

        const existProduct = productsArray.find(product => product.title === title && product.description === description);

        if (existProduct) {
            existProduct.stock += stock;
        } else {
            const product = {
                id: this.counter,
                title,
                description,
                price,
                thumbnail,
                stock
            };

            productsArray.push(product);
        }

        fs.writeFileSync(this.path, JSON.stringify(productsArray));
    }

    getProducts() {
        const productsString = fs.readFileSync(this.path, 'utf-8');
        const productsArray = JSON.parse(productsString);
        return productsArray;
    }

    getProductById(id) {
        const productsArray = this.getProducts();
        const product = productsArray.find(product => product.id === id);
        return product;
    }

    updateProduct(id, updatedProduct) {
        const productsArray = this.getProducts();
        const productIndex = productsArray.findIndex(product => product.id === id);

        if (productIndex !== -1) {
            productsArray[productIndex] = { ...updatedProduct, id };
            fs.writeFileSync(this.path, JSON.stringify(productsArray));
            return true;
        } else {
            return false;
        }
    }

    deleteProduct(id) {
        const productsArray = this.getProducts();
        const filteredProducts = productsArray.filter(product => product.id !== id);
        if (filteredProducts.length === productsArray.length) {
            return false;
        } else {
            fs.writeFileSync(this.path, JSON.stringify(filteredProducts));
            return true;
        }
    }
}

const manager = new ProductManager("Products.json");

manager.addProduct('arroz', 'grano fino', 20, 'https://example.com/product1-a.jpg' , 12);
manager.addProduct('salsa','salsa de tomate', 34, 'https://example.com/product2-b.jpg', 42);
manager.addProduct('fideos','moña', 30, 'https://example.com/product3-c.jpg', 23);

const products = manager.getProducts();
console.log(products);

const product = manager.getProductById(2);
console.log(product);

const updatedProduct = {
    id: 2,
    title: 'Salsa de tomate',
    description: 'Salsa de tomate casera',
    price: 36,
    thumbnail: 'https://example.com/product2-b.jpg',
    stock: 50
};
const result = manager.updateProduct(2, updatedProduct);
console.log(result);

const deleteResult = manager.deleteProduct(3);
console.log(deleteResult);