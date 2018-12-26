const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const fs = require('fs');
const projectsdata = "sample-data.json";


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static((__dirname+'/public')));


app.listen(port, () => {
	console.log(`Server running on port:${port}`);
});


app.get('/', (req, res, next) => {
    fs.readFile(__dirname + "/index.html", function (err, html) {
	  if (err) throw err;
	  res.end(html);
	});
	
});

app.get('/send', (req, res, next) => {
	fs.readFile(projectsdata, 'utf-8', (err, filedata) => {
		if (err) throw err
		let Data = JSON.parse(filedata);
		console.log('File has been read');
		res.send(Data);
	});
	
});
