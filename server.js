require("dotenv").config();

require("./db") 
// solo ejecuta todo lo que hay en ese archivo
// dentro de /db busca index.js y solo ejecuta ese archivo

const express = require("express");
const app = express(); // inicia el server

const config = require("./config")
config(app)



const router = require("./routes/index.routes")
app.use("/api", router)
// declara "/api" como un prefijo a TODAS las rutas de index.js


const errorHandling = require("./errors")
errorHandling(app)


// server listen & PORT
const PORT = process.env.PORT || 5005

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});