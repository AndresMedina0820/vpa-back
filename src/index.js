const express = require('express');
const app = express();
const port = 3004;
const routerApi = require('./routes');

app.use(express.json())

app.use(cors(options));

routerApi(app);
console.log(port);
app.listen(port);

app.get('/', (request, response) => {
	response.send('Hola soy goku');
});

