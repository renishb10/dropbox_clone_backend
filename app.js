const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');

// Custom dependency.
const config = require('./configs');
const routes = require('./routes');
global.logger = require('./helpers/logger').createCustLogger();
global.db = global.db ? global.db : require('./data/db')();

const app = express();

// Application middleware goes here.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse application/json
app.use(helmet.hidePoweredBy()); // Helmet helps you secure our application.
app.use('/', express.static(path.join(__dirname, 'client')));
app.use(express.static('public'));

// CORS
const corsOptions = {
  exposedHeaders: ['X-Total', 'X-TotalPages'],
};
app.use(cors(corsOptions));

// Routing middlewares
app.use('/', routes.index);
app.use(`${config.apiBasePath}/files`, routes.files);
app.use(`${config.apiBasePath}/users`, routes.users);

// Listener
app.listen(config.port, () => {
  logger.log('debug', `Listening on port ${config.port}...`);
});
