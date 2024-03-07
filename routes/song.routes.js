const express = require("express")
const router = express.Router()

const Song = require("../models/Song.model")

// POST "/api/songs " => ruta para crear canciones
router.post("/", async (req, res, next) => {

  console.log(req.body)

  const { title, timeInSeconds, releasedDate, artist } = req.body

  try {
  
    await Song.create({ 
      title, 
      timeInSeconds, 
      releasedDate, 
      artist 
    })

    res.sendStatus(201)

  } catch (error) {
    next(error)
  }

})

// GET "/api/songs " => ruta para listar canciones
router.get("/", async (req, res, next) => {

  try {
    
    // const response = await Song.find().populate("artist", "name genre colaborations")
    // lo que indicamos en el populate es EL NOMBRE DE LA PROPIEDAD
    // segundo argumento indicamos las unicas propiedades que queremos popular

    // populate anidado (y select para determinar propiedad requeridas)
    const response = await Song.find().populate({
      path: "artist",
      select: {name: 1, genre: 1, colaborations: 1},
      populate: {
        select: {name: 1},
        path: "colaborations"
      }
    })

    res.status(200).json(response)

  } catch (error) {
    next(error)
  }

})


module.exports = router