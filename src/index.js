const express = require('express');
const cors = require('cors');
const app = express();
const routerApi = require('./routes');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/errorsHandler');

app.use(express.json());

listWhite = [
  'http://localhost:3001',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:4173',
];

// Config
const options = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(options));

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log('Port: ', port);
});

// Routes
routerApi(app);

// Middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
