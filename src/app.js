import express from "express";
import productsRouter from "./router/products.router.js";
import cartsRouter from "./router/carts.router.js";

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const port = 8080;

app.listen(port, () => {
    console.log(`Puerto: ${port}`)
})

app.get("/", (req, res) => {
    res.send("Index")
})

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)