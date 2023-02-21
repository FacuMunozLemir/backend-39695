import express from "express";
import usersRouter from "./routes/products.router.js";
import cartsRouter from "./routes/cart.router.js";

const puerto = 8080;
const app = express();
app.use(express.json()); // esto es para recibir json en el cuerpo de la peticion
app.use(express.urlencoded({ extended: true })); //esto es para recibir datos desde un formulario
app.use(express.static("public")); //Esto es para utilizar los recursos de public de manera estática.

app.use("/api/products", usersRouter);
app.use("/api/carts", cartsRouter);

app.listen(puerto, () => {
  console.log(`Conectado al puerto ${puerto}`);
});
