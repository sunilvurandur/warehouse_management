const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const cors = require('cors');

app.use(cors({
    origin: '*'
}));
app.use(bodyParser.urlencoded({
    extended: true
}));


const {models} = require('./models')
 // sequelize models


 try {
    app.set('models', models);
} catch (error) {
    console.log('Error while abstracting models');
}


app.use(bodyParser.json());

app.get('', (req, res) => {
    res.send("Application is up and running")
})
const routes = require('./routes/routes');


const router = express.Router();
app.use(router)

app.use('/portal', routes);







const eraseDatabaseOnSync = false;
models.sequelize.sync({force: eraseDatabaseOnSync}).then(() => {
  console.log(`has migrated postgres data`);
  hasFinishedPostgresMigrations = true;
});

http.listen(process.env.APPLICATION_PORT || 8080, () => {
    console.log(` App server listening on port : 8080`);
})
