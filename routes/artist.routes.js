const express = require("express")
const router = express.Router()

const Artist = require("../models/Artist.model")

// GET "/api/artists" => vamos a crear una ruta que intente buscar todos los artistas que hay en la DB
router.get("/", (req, res, next) => {

  // 1. buscar los artistas en la DB
  Artist.find()       // buscar multiples documentos en esta colección
  .select({name: 1, genre: 1})      // unicamente dame estas propiedades
  .then((response) => {
    console.log(response)
    // 2. enviarlos al cliente
    res.status(200).json(response)
  })
  .catch((error) => {
    console.log(error)
  })

})

// GET "/api/artists/query" => filtar artistas por query de busqueda
router.get("/query", (req, res, next) => {

  console.log(req.query)

  // 1. buscar los artistas en la DB
  Artist.find({name: req.query.name})       // buscar multiples documentos en esta colección
  .select({name: 1, genre: 1})      // unicamente dame estas propiedades
  .then((response) => {
    console.log(response)
    // 2. enviarlos al cliente
    res.status(200).json(response)
  })
  .catch((error) => {
    console.log(error)
  })

})

// ruta para crear artistas
router.post("/", (req, res, next) => {

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
    res.sendStatus(201)
  })
  .catch((error) => {
    console.log(error)
    res.json(error)
  })
})

// ruta para buscar los detalles de un artista por su id
router.get("/:artistId", async (req, res, next) => {

  console.log(req.params)

  try {
    
    const response = await Artist.findById(req.params.artistId)
    res.status(200).json(response)

  } catch (error) {
    console.log(error)
  }

})

// ruta para borrar artistas por su id
router.delete("/:artistId", async (req, res, next) => {

  try {
    
    await Artist.findByIdAndDelete(req.params.artistId)
    res.status(202).json({message: "artista borrado"})

  } catch (error) {
    console.log(error)
  }

})

// ruta para actualizar todos los datos de un artista
router.put("/:artistId", async (req, res, next) => {

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
    res.status(202).json(response)

  } catch (error) {
    console.log(error)
  }

})

// una ruta especial solo para modificar el valor de la propiedad isTouring (toggle).
router.patch("/:artistId/is-touring", async (req, res, next) => {

  try {
    
    const artistDetails = await Artist.findById(req.params.artistId)
    console.log(artistDetails)
    const response = await Artist.findByIdAndUpdate(req.params.artistId, {
      isTouring: !artistDetails.isTouring
    }, {new: true})
    res.status(202).json(response)

  } catch (error) {
    console.log(error)
  }

})


// una ruta especial que agregue nuevos generos a la propiedad de genre.
router.patch("/:artistId/genre", async (req, res, next) => {

  console.log(req.params)
  console.log(req.body)
  
  try {
    console.log(patata)
    
    const response = await Artist.findByIdAndUpdate(req.params.artistId, {
      $addToSet: {genre: req.body.newGenre}
    }, {new: true})
    res.status(202).json(response)

  } catch (error) {
    // next() // sin ningun argumento. Salta a proxima ruta
    next(error) // se comporta como un error 500 y salta al gestor de errores 500 de express
  }

})


module.exports = router