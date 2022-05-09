const express = require('express');
const app = express();
const routerApi = require('./routes');

app.use(express.json())

routerApi(app);
app.listen(process.env.PORT || 3000)

app.get('/', (request, response) => {
	response.send('API REST VPA');
});

