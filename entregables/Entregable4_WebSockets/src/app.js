import { Express } from "express";
import handlebars from "express-handlebars";

const app = express();

app.use("/static", express.static("./public"));
app.use(express.json());
