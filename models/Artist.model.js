const mongoose = require("mongoose")

// crear el esquema
const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // el campo es obligatorio
    unique: true // el campo no se puede repetir en otros documentos
  },
  awardsQty: {
    type: Number,
    required: true,
    min: 0, // el valor menor es 0. No pueden ser numeros negativos,
    default: 0 // si no se agrega el valor, entonces el valor inicial será este.
  },
  isTouring: {
    type: Boolean
  },
  genre: {
    type: [String], // el valor va a ser un array de strings
    enum: ["rock", "indie", "alternative", "metal", "pop", "country"]// permite definir los UNICOS posibles valor que tendrá esta propiedad
  }
})


// crear el modelo
const Artist = mongoose.model("Artist", artistSchema)
// 1. el nombre interno con el que se conocerá el model
// 2. el esquema que hemos definido para cada documento de la colección

module.exports = Artist
// lo exportamos para poder acceder a la BD (esta colección) desde cualquier archivo del servidor