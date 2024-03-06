require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/artist-songs-db')
.then(() => {
  console.log("todo bien, conectados a la DB")
})
.catch(() => {
  console.log("todo mal, hubo problemas en la conexión a la DB")
})


const app = express();

// all middlewares & configurations here
app.use(morgan("dev"));
app.use(express.static("public"));

// below two configurations will help express routes at correctly receiving data. 
app.use(express.json()); // recognize an incoming Request Object as a JSON Object
app.use(express.urlencoded({ extended: false })); // recognize an incoming Request Object as a string or array





const Artist = require("./models/Artist.model")

// all routes here...
app.get("/", (req, res, next) => {
  res.json({ message: "all good here!" })
})

// vamos a crear una ruta que intente buscar todos los artistas que hay en la DB
app.get("/artists", (req, res, next) => {

  // 1. buscar los artistas en la DB
  Artist.find()       // buscar multiples documentos en esta colección
  .select({name: 1, genre: 1})      // unicamente dame estas propiedades
  .then((response) => {
    console.log(response)
    // 2. enviarlos al cliente
    res.json(response)
  })
  .catch((error) => {
    console.log(error)
  })

})

// filtar artistas por query de busqueda
app.get("/search/artists", (req, res, next) => {

  console.log(req.query)

  // 1. buscar los artistas en la DB
  Artist.find({name: req.query.name})       // buscar multiples documentos en esta colección
  .select({name: 1, genre: 1})      // unicamente dame estas propiedades
  .then((response) => {
    console.log(response)
    // 2. enviarlos al cliente
    res.json(response)
  })
  .catch((error) => {
    console.log(error)
  })

})

// ruta para crear artistas
app.post("/artists", (req, res, next) => {

  // 1. recibir del cliente, la informacion para crear el artista
  console.log(req.body)
  // 2. crear el artista en la BD

  Artist.create({
    name: req.body.name,
    awardsQty: req.body.awardsQty,
    isTouring: req.body.isTouring,
    genre: req.body.genre
  })
  .then(() => {
    // 3. indicarle al cliente, que ha sido creado.
    res.json({message: "Todo bien, documento creado"})
  })
  .catch((error) => {
    console.log(error)
    res.json(error)
  })
})

// ruta para buscar los detalles de un artista por su id
app.get("/artists/:artistId", async (req, res, next) => {

  console.log(req.params)

  try {
    
    const response = await Artist.findById(req.params.artistId)
    res.json(response)

  } catch (error) {
    console.log(error)
  }

})

// ruta para borrar artistas por su id
app.delete("/artists/:artistId", async (req, res, next) => {

  try {
    
    await Artist.findByIdAndDelete(req.params.artistId)
    res.json({message: "artista borrado"})

  } catch (error) {
    console.log(error)
  }

})

// ruta para actualizar todos los datos de un artista
app.put("/artists/:artistId", async (req, res, next) => {

  console.log(req.params)
  console.log(req.body)

  const { name, awardsQty, isTouring, genre } = req.body

  try {
    
    const response = await Artist.findByIdAndUpdate(req.params.artistId, {
      name,
      awardsQty,
      isTouring,
      genre
    }, {new: true})
    // el metodo hace la actualización, pero devuelve el documento antes de hacer la actualización.
    // si por alguna razón, queremos que nos devuelve el doc. despues de la actualización. {new: true}
    res.json(response)

  } catch (error) {
    console.log(error)
  }

})


// una ruta especial solo para modificar el valor de la propiedad isTouring (toggle).
app.patch("/artists/:artistId/toggle-is-touring", async (req, res, next) => {

  try {
    
    const artistDetails = await Artist.findById(req.params.artistId)
    console.log(artistDetails)
    const response = await Artist.findByIdAndUpdate(req.params.artistId, {
      isTouring: !artistDetails.isTouring
    }, {new: true})
    res.json(response)

  } catch (error) {
    console.log(error)
  }

})


// una ruta especial que agregue nuevos generos a la propiedad de genre.
app.patch("/artists/:artistId/add-genre", async (req, res, next) => {

  console.log(req.params)
  console.log(req.body)

  try {
    
    const response = await Artist.findByIdAndUpdate(req.params.artistId, {
      $addToSet: {genre: req.body.newGenre}
    }, {new: true})
    res.json(response)

  } catch (error) {
    console.log(error)
  }

})

// server listen & PORT
const PORT = process.env.PORT || 5005

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});