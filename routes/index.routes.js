const express = require("express")
const router = express.Router()


// GET "/api" => all routes here...
router.get("/", (req, res, next) => {
  res.status(200).json({ message: "all good here!" })
})

// "/api/artists"
const artistRouter = require("./artist.routes")
router.use("/artists", artistRouter)

// "/songs"
const songRouter = require("./song.routes")
router.use("/songs", songRouter)

// "/users"

// "/auth"

// "/query"

// "/api-externa"


module.exports = router