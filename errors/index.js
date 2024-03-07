
module.exports = (app) => {
  
  // error handling (siempre al final)
  
  // 404 not found
  app.use((req, res, next) => {
    // esto se ejecuta siempre que la llamada llegue a este punto
    res.status(404).json({errorMessage: "Esta ruta no existe"})
  })
  
  // 500 Server Error (cada vez que algó falle en una ruta, gestiona ese error acá)
  app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).json({errorMessage: "El servidor explotó :("})
  })
  
}