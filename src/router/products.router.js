import { Router } from "express";
import fs from "fs";

const router = Router();

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.counter = 0;
    this.code = 0;
  }

  addProduct(title, description, price, stock, category, thumbnail) {
    const productsArray = this.getProducts();

    const existProduct = productsArray.find(
      (product) =>
        product.title === title && product.description === description
    );

    const lastProduct = productsArray[productsArray.length - 1];
    const lastCode = productsArray[productsArray.length - 1];

    if (existProduct) {
      existProduct.stock += 1;
    } else {
      const product = {
        id: lastProduct ? lastProduct.id + 1 : 1,
        title,
        description,
        price,
        status: true,
        stock,
        category,
        thumbnail,
        code: lastCode ? lastCode.id + 123 + `ABC` : "ABC120",
      };

      productsArray.push(product);
      fs.writeFileSync(this.path, JSON.stringify(productsArray));
    }
  }

  getNewProductId() {
    const productsArray = this.getProducts();
    const lastProduct = productsArray[productsArray.length - 1];
    const newId = lastProduct ? lastProduct.id + 1 : 1;
    return newId;
  }

  getProducts() {
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, "[]");
      const productsString = fs.readFileSync(this.path, "utf-8");
      const productsArray = JSON.parse(productsString);
      return productsArray;
    } else {
      const productsString = fs.readFileSync(this.path, "utf-8");
      const productsArray = JSON.parse(productsString);
      return productsArray;
    }
  }

  getProductById(id) {
    const productsArray = this.getProducts();
    const product = productsArray.find((product) => product.id === id);
    return product;
  }

  updateProduct(id, updatedProduct) {
    const productsArray = this.getProducts();
    const productIndex = productsArray.findIndex(
      (product) => product.id === id
    );

    if (productIndex !== -1) {
      productsArray[productIndex] = { id, ...updatedProduct};
      fs.writeFileSync(this.path, JSON.stringify(productsArray));
      return true;
    } else {
      return false;
    }
  }

  deleteProduct(id) {
    const productsArray = this.getProducts();
    const filteredProducts = productsArray.filter(
      (product) => product.id !== id
    );
    if (filteredProducts.length === productsArray.length) {
      return false;
    } else {
      fs.writeFileSync(this.path, JSON.stringify(filteredProducts));
      return true;
    }
  }
}

const manager = new ProductManager("src/Products.json");

manager.addProduct(
  "arroz",
  "grano fino",
  20,
  12,
  "legumbres",
  "https://example.com/product1-a.jpg"
);
manager.addProduct(
  "salsa",
  "salsa de tomate",
  34,
  42,
  "salsas",
  "https://example.com/product2-b.jpg"
);
manager.addProduct(
  "fideos",
  "moña",
  30,
  23,
  "pastas",
  "https://example.com/product3-c.jpg"
);
manager.addProduct(
  "fiasdasddeos",
  "moasdasdña",
  32342340,
  2234234,
  "qwdqwdqw",
  "https://example.com/product3-c.jpg"
);
manager.addProduct(
  "papas fritas",
  "frios",
  42,
  200,
  "fritos",
  "https://example.com/product3-c.jpg"
);
manager.addProduct(
  "coca-cola",
  "comun",
  120,
  250,
  "bebidas",
  "https://example.com/product3-c.jpg"
);
manager.addProduct(
  "sprite",
  "comun",
  230,
  280,
  "bebidas",
  "https://example.com/product3-c.jpg"
);
manager.addProduct(
  "fanta",
  "comun",
  230,
  280,
  "bebidas",
  "https://example.com/product3-c.jpg"
);

router.delete("/:pid", (req, res) => {
  const pid = parseInt(req.params.pid)
  const deleteProduct = manager.deleteProduct(pid)

  if(deleteProduct) {
    res.status(200).json({ msg: "Product deleted"})
  }else {
    res.status(400).json({ msg: "Product not found"})
  }
})

router.put("/:pid", (req, res) => {
  const pid = parseInt(req.params.pid);
  const updateProduct = req.body;

  const result = manager.updateProduct(pid, updateProduct);

  if (result) {
    res.json({ message: "Product modified" });
  } else {
    res.status(400).json({ error: "Something went wrong" });
  }
});

router.post("/", (req, res) => {
  const {
    title,
    description,
    price,
    stock,
    category,
    thumbnail,
  } = req.body;
  const newProduct = {
    id: manager.getNewProductId(),
    title,
    description,
    price,
    stock,
    category,
    thumbnail: thumbnail ? thumbnail : []
  };

  if (!title || !description || !price || !stock || !category) {
    res.status(400).json({ error: "missing required field" });
  } else {
    manager.addProduct(newProduct);
    res.json(newProduct);
  }
});

router.get("/", (req, res) => {
  let products = manager.getProducts();
  const limits = parseInt(req.query.limit);

  if (limits) {
    products = products.slice(0, limits);
    if (limits > products.length) {
      res.status(404).json({ error: "Products not found" });
    }
    res.json(products);
  } else {
    res.json(products);
  }
});

router.get("/:pid", (req, res) => {
  const id = parseInt(req.params.pid);
  const product = manager.getProductById(id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

router.get("/:pid", (req, res) => {
  const id = parseInt(req.params.pid);
  const product = manager.getProductById(id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// const products = manager.getProducts();
// console.log(products);

// const product = manager.getProductById(2);
// console.log(product);

// const updatedProduct = {
//     id: 2,
//     title: 'Salsa de tomate',
//     description: 'Salsa de tomate casera',
//     price: 36,
//     thumbnail: 'https://example.com/product2-b.jpg',
//     stock: 50
// };
// const result = manager.updateProduct(2, updatedProduct);
// console.log(result);

// const deleteResult = manager.deleteProduct(3);
// console.log(deleteResult);

export default router;