const express = require('express');
const server = express();
const logging = require('@zaneray/express-logging');
const helmet = require('helmet');

//setup logging
const logger = logging.create();

//setup Security headers
server.use(helmet());

//setup express configuration
server.set('trust.proxy', true);
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

async function start() {
  //setup serving the site root
  server.use('/', express.static('dist/styleguide'));
  // Listen the server
  server.listen(port, host);
  logger.debug('Server listening on http://' + host + ':' + port);
}
start();
