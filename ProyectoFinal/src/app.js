import express from "express";
import usersRouter from "./routes/products.router.js";
import cartsRouter from "./routes/cart.router.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";

const puerto = 8080;
const app = express();

app.use(express.json()); // esto es para recibir json en el cuerpo de la peticion
app.use(express.urlencoded({ extended: true })); //esto es para recibir datos desde un formulario
app.use(express.static("public")); //Esto es para utilizar los recursos de public de manera estática.

app.engine("handlebars", engine()); //que motor uso
app.set("views", "./ProyectoFinal/views"); //de que carpeta saco las vistas
app.set("view engine", "handlebars"); //Que extensión uso por defecto al reenderizar un archivo?

app.use("/api/products", usersRouter);
app.use("/api/carts", cartsRouter);

const servidorConectado = app.listen(8080, () => {
  console.log("conectado al puerto 8080");
});

const io = new Server(servidorConectado);
