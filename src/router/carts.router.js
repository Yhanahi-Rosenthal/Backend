import { Router } from "express";
import fs from "fs";

const router = Router()

router.post("/:cid/product/:pid", (req, res) => {
    const carts = fs.readFileSync("src/Carts.json", "utf-8")
    const arrayCarts = JSON.parse(carts)

    const cartId = parseInt(req.params.cid)
    const result = arrayCarts.find(cart => cart.idCart === cartId)
    console.log(result)

    if(result) {
        const productId = parseInt(req.params.pid)

        const existingProduct = result.product.find((prod) => prod.id === productId);

        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          result.product.push({ id: productId, quantity: 1 });
        }

        fs.writeFileSync("src/Carts.json", JSON.stringify(arrayCarts))
        res.status(200).json({msg: "Product created"})
    }else {
        res.status(400).json({Error: "This cart id not exists"})
    }
})

router.get("/:cid", (req, res) => {
    const idCarts = parseInt(req.params.cid)
    const carts = fs.readFileSync("src/Carts.json", "utf-8")
    const arrayCarts = JSON.parse(carts)

    const result = arrayCarts.find(cart => cart.idCart === idCarts)

    if(result) {
        res.status(200).json(result)
    }else {
        res.status(400).json({Error: "this cart id not exists"})
    }

})

router.post("/", (req, res) => {
    const carts = fs.readFileSync("src/Carts.json", "utf-8")
    const arrayCarts = JSON.parse(carts)

    const lastCart = arrayCarts[arrayCarts.length - 1]
    const cartID = lastCart ? lastCart.idCart + 1 : 1

    if(arrayCarts){
        arrayCarts.push({ idCart: cartID, product: []})
        fs.writeFileSync("src/Carts.json", JSON.stringify(arrayCarts))
        res.status(200).json({msg:"Cart created"})
    }else{
        res.status(400).json({msg:"something went wrong"})
    }

})

router.get("/", (req, res) =>{

    let idPro = [];

   products.map(product => {
       idPro.push({id: product.id, quantity: 1})
    });


    res.status(200).json({cartId: cartId, products: idPro})
})

export default router;