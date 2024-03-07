const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/artist-songs-db')
.then(() => {
  console.log("todo bien, conectados a la DB")
})
.catch(() => {
  console.log("todo mal, hubo problemas en la conexión a la DB")
})