const dotenv = require('dotenv');
// const cookieParser = require('cookie-parser');

// Express Dependencies:
const express = require('express');
// Sanitizacion XSS
const xss = require('xss-clean');
// Custom Dependencies:
const helmet = require('helmet');
const session = require('express-session');
// Winston logger Dependencies
const cors = require('cors');
// eslint-disable-next-line import/no-unresolved
const logger = require('./utils/winston.logger');
// Models:
const models = require('./models');
// const userModels = require('./models').user;
// const adminModels = require('./models').admin;
// const passwordModels = require('./models').password;

// Rutes:
// const routes = require('./routes');

// Conexión con base de datos
const config = require('./config/config');
const validateEnv = require('./utils/validateEnv');

const app = express();
app.listen(3000, () => {
  console.log('servidor corriendo en el localhost 3000');
});

validateEnv.validate();
app.use(helmet());
app.use(helmet.ieNoOpen());

// Sets "Strict-Transport-Security: max-age=5184000; includeSubDomains".
const sixtyDaysInSeconds = 5184000;
app.use(helmet.hsts({
  maxAge: sixtyDaysInSeconds,
}));
// Sets "X-Content-Type-Options: nosniff".
app.use(helmet.noSniff());
app.use(helmet.frameguard({ action: 'deny' }));

app.use(xss());
// Sets cookies security settings
const sess = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: 'strict',
    secure: true,
  },
};
if (config.environment === 'production') {
  app.set('trust proxy', 1); // trust first proxy
}
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded(
  {
    extended: false,
    limit: '10kb',
    parameterLimit: 10,
  },
));

// Cors configuration
const whitelist = process.env.CORS.split(' ');

const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      logger.api.error('Not allowed by CORS', { origin });
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));

if (config.environment === 'production') {
  app.set('trust proxy', 1); // trust first proxy
}

models.sequelize.authenticate()
  .then(() => {
    logger.api.debug('Conexión con la Base de Datos: EXITOSA');
  })
  .catch((err) => {
    logger.api.error('Conexión con la Base de Datos: FALLIDA');
    logger.api.error(err);
  });

app.use('/', require('./routes/index'));

// Para procesar datos enviados del form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Seteamos las variables de entorno
dotenv.config({ path: '/back/env/.env' });

module.exports = app;
