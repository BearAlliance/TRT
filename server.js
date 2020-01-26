const express = require('express');
const path = require('path');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('common'));
app.use(helmet());
app.use(compression());

app.get('*', function(req, res, next) {
  if (
    req.headers['x-forwarded-proto'] !== 'https' &&
    process.env.NODE_ENV === 'production'
  )
    res.redirect(301, `https://${req.hostname}${req.url}`);
  else next(); /* Continue to other routes if we're not redirecting */
});

app.use('/', express.static(path.join(__dirname, 'build')));
app.use(
  '*',
  express.static(path.join(__dirname, 'build/views/not-found.html'))
);

app.listen(port, () => console.log(`App listening on port ${port}!`));
