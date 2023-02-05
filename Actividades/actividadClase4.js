//Realizar un ´programa que cree un archivo en el cual escriba la fecha y la hora actual. posteriormente leer el archivo y mostrar el contenido por consola. Utilizar el modulo fs y sus operacioens de tipo callback.

const {
  readFileSync, //lee un archivo
  writeFileSync, //escribe o sobreescribe un archivo
} = require("fs");

var fecha = new Date();
var options = { year: "numeric", month: "long", day: "numeric" };

try {
  writeFileSync("./hora.txt", fecha.toLocaleDateString("es-ES", options));
} catch {}
try {
  const contenido = readFileSync("./hora.txt", "utf-8");
  console.log(contenido);
} catch (error) {
  console.log(error.message);
}
