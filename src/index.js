const express = require('express');
const app = express();
const routerApi = require('./routes');

const cors = require('cors');

app.use(express.json())

const whiteList = ['http://localhost:3000/'];
const options = {
	origin: (origin, callback) => {
		if (whiteList.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not Allow'), false);
		}
	}
};
app.use(cors(options));

routerApi(app);
app.listen(process.env.PORT || 3000)

app.get('/', (request, response) => {
	response.send('API REST VPA');
});

