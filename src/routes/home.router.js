import express from 'express';
import { ProductManager } from "../productManager.js"

export const productRouterHtml = express.Router();
const products = new ProductManager("./products.json");

productRouterHtml.get("/", async (req, res) => {
    try {
        const data = await products.getProducts();
        return res.status(200).render("home", { data });

    }
    catch (err) {
        return res.status(500).json({ status: "error", msg: "Error in server", data: {} })
    }
})
