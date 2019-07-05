//

const express = require('express');

const { PORT } = require('./config/config');

const { logger } = require('./config/logger');

const app = express();

require('./config/middleware.express')(app);

logger.info('Application middleware is configured');

require('./config/routes')(app);

logger.info('Application routes have been loaded');

app.listen(PORT, () => {
	logger.info(`Your app is listening on port ${PORT}`);
});
