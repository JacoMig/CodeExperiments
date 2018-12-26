const express = require('express');
var hbs = require('hbs');
const routes = require('./routes')
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({extended: true}));


// view engine setup
hbs.registerPartials(__dirname + '/views/partials');

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.use(bodyParser.json());
app.use('/', routes);
app.use(express.static((__dirname+'/public')));

app.listen(port, () => {
	console.log('Server running on port: '+port);
});




