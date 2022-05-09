const express = require('express');
const app = express();
const port = 3000;
const routerApi = require('./routes');

app.use(express.json())

routerApi(app);
console.log(port);
app.listen(port);

app.get('/', (request, response) => {
	response.send('API REST VPA');
});

