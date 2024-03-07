const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({
  title: {
    type: String
  },
  timeInSeconds: Number,
  releasedDate: Date,
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist" // el nombre interno del modelo al cual está relacionada
  },
  // album: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Album" // el nombre interno del modelo al cual está relacionada
  // }
})

const Song = mongoose.model("Song", songSchema)

module.exports = Song