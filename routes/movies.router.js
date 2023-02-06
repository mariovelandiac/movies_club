const express = require("express");
const router = express.Router();
const MoviesServices = require("../services/movies.services");
const service = new MoviesServices();
const validatorHandler = require("../middlewares/validator.handler");
const {createMovieSchema, updateMovieSchema,getMovieSchema, addActorSchema,
  addGenreSchema, querySchema}
 = require("../schemas/movies.schemas");

// ruta para endpoint de movies

router.get("/",
  validatorHandler(querySchema, 'query'),
  async (req, res, next) => {
  try {
    const movies = await service.find(req.query);
    res.json(movies)
  } catch (e) {
    next(e)
  }
})

// ruta para la película con endpoint 0
// las rutas específicas deben ir siempre antes de las rutas dinámicas
router.get('/0', async (req, res) => {
  res.send("Hola de nuevo!")
})

// ruta para endpoint de una película en partícular
router.get('/:id',
  validatorHandler(getMovieSchema, 'params'), //validación
  async (req, res, next) => { // ejecución del sistema
  try {
    const {id} = req.params; // extraemos el id de la solicitud
    const movie = await service.findeOne(id);
    res.json(movie)
  } catch (err) {
    next(err)
  }

})

router.post('/',
  validatorHandler(createMovieSchema, 'body'),
  async (req, res, next) => {
  try {
    const body = req.body;
    const newMovie = await service.create(body);
     res.status(201).json(newMovie);
  } catch (e) {
    next(e)
  }
});

router.post('/add-actor',
  validatorHandler(addActorSchema, 'body'),
  async (req, res, next) => {
  try {
    const body = req.body;
    const newMovie = await service.addActor(body);
     res.status(201).json(newMovie);
  } catch (e) {
    next(e)
  }
});

router.post('/add-genre',
  validatorHandler(addGenreSchema, 'body'),
  async (req, res, next) => {
  try {
    const body = req.body;
    const newMovie = await service.addGenre(body);
     res.status(201).json(newMovie);
  } catch (e) {
    next(e)
  }
});

router.post('/:id', async (req, res) => {
  res.status(405).send("action not allowed")
})

router.patch('/:id',
  validatorHandler(getMovieSchema, 'params'),
  validatorHandler(updateMovieSchema, 'body'),
  async (req, res, next) => {
  try {
    const {id} = req.params;
    const body = req.body;
    const movie = await service.update(id, body)
     res.json(movie)
   } catch (e) {
      next(e)
    }
  })

 router.delete('/:id',
 validatorHandler(getMovieSchema, 'params'),
 async (req, res, next) => {
  try {
    const {id} = req.params;
    const movie =  await service.delete(id)
    res.json(movie)
  } catch (e) {
    next(e)
  }
 });


module.exports = router;
