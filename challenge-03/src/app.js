const ProductManager = require("./productManager");
const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = 8080;

app.listen(port, () => {
    console.log(`Puerto: ${port}`)
})

app.get("/", (req, res) => {
    res.send("Index of challenge 03")
})

const manager = new ProductManager("src/Products.json")

app.get("/products", (req, res) =>{
    let products = manager.getProducts()
    const limits = parseInt(req.query.limit)

    if(limits){
        products = slice(0, limits)
        if(limits > products.length){
            res.status(404).json({error:"Products not found"})
        }
        res.json(products)
    }else{
        res.json(products)
    }
})

app.get("/products/:pid", (req, res) =>{
    const id = parseInt(req.params.pid)
    const product = manager.getProductById(id)

    if(product){
        res.json(product)
    }else{
        res.status(404).json({error:"Product not found"})
    }
})