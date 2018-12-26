'use strict';

var express = require('express');
var router = express.Router();
var path = require ('path');
var multipart = require('connect-multiparty');
var thumb = require('node-thumbnail').thumb;
const fs = require('fs');
let projectsdata =  "./app/dataproject.json";
//let dataTest = "./app/test.json";


/** ADMIN ROUTE **/
router.get('/', function(req, res){
	fs.readFile(projectsdata, 'utf-8', (err, data) => {
		if (err) throw err
		res.render('../views/admin.html', {"jsonData" : JSON.parse(data)});
	});
});

router.get('/frontpage', function(req, res){
	fs.readFile(projectsdata, 'utf-8', (err, data) => {
		if (err) throw err
		res.render('../views/frontpage.html', {"jsonData" : JSON.parse(data)});
	});
});

var hasImage = false;
var imageName = "";
router.post('/', multipart(), (req, res, next) => {
		
		fs.readFile(req.files.image.path, function (err, data) {
		   	imageName = req.files.image.name
			// If there's an error
		    if(!imageName){
		      console.log("There was an error Uploading image")
		      hasImage = false;
		     next();
		     // res.end();
		    } else {
		    	hasImage = true;
		    	  console.log('Image has been read');
		    	  var newPath = path.join(__dirname,"../public/uploads/fullsize/" + imageName);
			      var thumbPath = path.join(__dirname, "../public/uploads/thumbs/" + imageName);
			      
			      fs.writeFile(newPath, data, function (err) {
			        // write file to uploads/thumbs folder
			        console.log('write file to uploads/thumbs');
			        thumb({
					  source: newPath, // could be a filename: dest/path/image.jpg
					  destination: path.join(__dirname, "../public/uploads/thumbs/"),
					  concurrency: 4,
					  overwrite: true,
					  suffix: '',
					  width:100
					}, function(files, err, stdout, stderr) {
						if (err) throw err;
						console.log('thumb created: '+imageName);
						next();	
					});
					
			      });
			}
		    
		})
		
		
	}, (req, res) => {
		let id = req.body.id;
		let method = req.body.method;
		console.log('method: '+method)
		let found = false;
		let newData = {};
		if(method === "post"){
			fs.readFile(projectsdata, 'utf-8', (err, filedata) => {
				if (err) throw err
				let oldData = JSON.parse(filedata);
				newData = {id: req.body.id, title: req.body.title, text: req.body.text , picurl:imageName};	
				oldData.projectslist.push(newData)
				oldData.projectslist.sort((a,b) => { return a.id < b.id ? 1 : -1 })
				console.log('File is ready for posting');
				fs.writeFile(projectsdata, JSON.stringify(oldData) ,'utf-8', (err) => {
					if(err) throw err
					console.log('File has been written');
					res.send(newData);
				});
			});	
		}else if(method === "update"){	
			fs.readFile(projectsdata, 'utf-8', (err, filedata) => {
				if (err) throw err
				let oldData = JSON.parse(filedata);
				console.log('File is ready for updating');
				oldData.projectslist.forEach((item, i) => {
				 	if(!found && (item.id === id)){
				 		item.title = req.body.title;
				 		item.text = req.body.text;
						if(hasImage)
				 			item.picurl = imageName;
				 		newData = {id: item.id, title: item.title, text: item.text, picurl: item.picurl};
				 		found = true;
				 		console.log('update content')
					}
				})
				fs.writeFile(projectsdata, JSON.stringify(oldData) ,'utf-8', (err) => {
					if(err) throw err
					console.log('File has been updated and has image: '+imageName);
					res.send(newData);	

				});
				
			});	
		}else if(method === "delete"){
			fs.readFile(projectsdata, 'utf-8', (err, data) => {
				if (err) throw err
				const updateProjects = JSON.parse(data).projectslist.filter(item => item.id != id);
				const updateData = new Object();
				updateData.projectslist = updateProjects;
				console.log('File has been read, Array Product has been deleted');
				fs.writeFile(projectsdata, JSON.stringify(updateData) ,'utf-8', (err) => {
					if(err) throw err
					console.log('File has been deleted');
					res.send('delete');	
				});
			});	
		}
})






module.exports = router;