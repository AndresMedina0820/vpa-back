const express = require('express');
const cors = require('cors');
const app = express();
const routerApi = require('./routes');

app.use(express.json())

// const whiteList = ['http://localhost:3000/', 'https://vpa-back.herokuapp.com/'];
// const options = {
// 	origin: (origin, callback) => {
// 		if (whiteList.includes(origin) || !origin) {
// 			callback(null, true);
// 		} else {
// 			callback(new Error('Not Allow'), false);
// 		}
// 	}
// };
// app.use(cors(options));

const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

routerApi(app);
app.listen(process.env.PORT || 3000)

app.get('/', (request, response) => {
	response.send('API REST VPA');
});

