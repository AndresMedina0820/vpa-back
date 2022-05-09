const express = require('express');
const cors = require('cors');
const app = express();
const routerApi = require('./routes');

app.use(express.json())

const options ={
    origin:'http://localhost:3000',
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(options));

routerApi(app);
app.listen(process.env.PORT || 3000)

app.get('/', (request, response) => {
	response.send('API REST VPA');
});

