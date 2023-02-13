import express from "express";
import { ProductManager } from "./ClassProductManager.js";

const puerto = 8080;
const app = express();
app.use(express.urlencoded({ extended: true }));
const producto = new ProductManager();

app.get("/products", async (req, res) => {
  let limite = req.query.limit;
  let resultado = await producto.getProducts(limite);
  res.send({ resultado });
});

app.get("/products/:id", async (req, res) => {
  let id = req.params.id;
  console.log(id);
  let resultado = await producto.getProductById(id);
  res.send({ resultado });
});

app.listen(puerto, () => {
  console.log(`Conectado al puerto ${puerto}`);
});
