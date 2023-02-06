const express = require("express");
const routerApi = require("./routes");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const {logErrors,errorHandler, boomErrorHandler,ormErrorHandler} = require('./middlewares/error.handler');
const {checkApiKey} = require('./middlewares/auth.handler')
// habilitar uso de JSON
app.use(express.json());

// habilitar uso de CORS
// Objeto de configuración CORS
const whitelist = ["172.20.217.246"];
const options = {
  origin: (origin, cb) => {
    if (whitelist.includes(origin) || !origin) {
      cb(null, true)
    } else {
      cb(new Error("domain not allowed"))
    }
  }
}
app.use(cors(options));

// invocación de capa de autenticación
require('./utils/auth/index')

// ejemplo para autenticar con APIkey
app.get('/nueva-ruta',
checkApiKey,
async (req, res) => {
  res.json({message: 'Hola, estas autorizado'})
})

// habilita Router
routerApi(app);

// Middleware de manejo de errores
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// ponemos a escuchar al servidor y notificamos
app.listen(PORT, () => {
})
