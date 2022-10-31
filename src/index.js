const express = require('express');
const cors = require('cors');
const app = express();
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorsHandler');

app.use(express.json())

const options = {
    origin:'http://localhost:3001',
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(options));

app.get('/', (request, response) => {
	response.send('API REST VPA');
});

routerApi(app);

// Middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

const port = process.env.PORT || 3005
app.listen(port, () => {
	console.log("Port: ", port)
});
