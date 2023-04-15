class ProductManager {

    constructor(products = []) {
        this.products = products
        this.id = 0
        this.code = Math.random()
    }

    addProduct(title, description, price, thumbnail, stock) {
        this.product = {
            title,
            description,
            price,
            thumbnail,
            stock
        }

        if(this.products.some(product => { product.code === this.code})){
            throw new Error("this code already exist")
        }else if(this.products.some(product => {product.id === this.id})){
            throw new Error("id same that other product")
        }else{
            const newProduct = { ...this.product, id: this.id++, code: this.code++ }
            this.products.push(newProduct)
            return newProduct
        }
    }

    getProduct(){
        return this.products
    }

    getElementById(id){

        const product = this.products.find(product => product.id === id)

        if(!product){
            console.log('Not Found')
        }
        return product
    }
    
}

const manager = new ProductManager;

manager.addProduct('arroz','grano fino', 20,'https://example.com/product1-a.jpg' , 12)
manager.addProduct('salsa','salsa de tomate', 34,'https://example.com/product2-b.jpg', 42)
manager.addProduct('fideos','moña', 30,'https://example.com/product3-c.jpg', 23)

const products = manager.getProduct()
console.log(products)

const productId = manager.getElementById(1)
console.log(productId)
