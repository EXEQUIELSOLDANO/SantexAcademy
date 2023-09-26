const Express = require('express');
const pollsterRoutes = require('./pollsterRoutes');
const adminRoutes = require('./adminRoutes');
const loginRoutes = require('./loginRoutes');
const encuestaRoute = require('./preguntasRoute');
const opcionRespuestaRoutes = require('./opcionRespRoutes');
const respuestasRoute = require('./respuestaRoute');

// Middlewares:
const rootPath = require('../middleware/root_path.middleware');
const errors = require('../middleware/error_handler.middleware');

const app = Express();

// use=

app.use('/ping', (req, res) => {
  res.json({
    response: 'pong!',
  });
});
// Agregar aqui las rutas
app.use('/pollsters', pollsterRoutes, rootPath.setHeaders);
app.use('/admins', adminRoutes, rootPath.setHeaders);
app.use('/login', loginRoutes);
app.use('/preguntas', encuestaRoute);
app.use('/opcion-respuestas', opcionRespuestaRoutes);
app.use('/respuestas', respuestasRoute);

app.use('/', rootPath.handler);
app.use(rootPath.setHeaders);
app.use(errors.handler);

module.exports = app;
