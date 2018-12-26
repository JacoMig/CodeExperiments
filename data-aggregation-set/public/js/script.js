(function () {
	/*const sampledata = [
	    { id: 8, playTime:  500, auto: false },
    { id: 7, playTime: 1500, auto: true  },
    { id: 1, playTime:  100, auto: true  },
    { id: 7, playTime: 1000, auto: false },
    { id: 7, playTime: 2000, auto: false },
    { id: 2, playTime: 2000, auto: true  },
    { id: 2, playTime: 2000, auto: true  },
    { id: 7, playTime: 2000, auto: false },
    { id: 2, playTime: 2000, auto: true  },
    { id: 2, playTime: 2000, auto: true  }
	];*/

	const printCode = document.querySelector('.print_code');
	const formData = document.querySelector('#formData');
	formData.addEventListener('submit', sendFormData);

	function select(data, options){
		const auto = options.auto;
		const id = options.id;
		const minPlayTime = options.minPlayTime;
		const merge = options.merge;
		
		let datasample = Object.values(data);
		let datamerged = [];
		
		// FILTER DATA THROUGH ID, MIN PLAY TIME and AUTO
		let filterdata = datasample.filter(item => {
		   if(id === undefined || item.id === id || isNaN(id))
				return true
			else 
				return false
		}).filter(x => {
			if(minPlayTime === undefined || x.playTime >= minPlayTime || isNaN(minPlayTime))
				return true
			else 
				return false
		}).filter(y => {
			if(auto === undefined || y.auto === auto)
				return true
			else 
				return false
		});

		if(merge){
			
			// WHEN DATA ARE FILTERED IF IS merge === true THEN MERGED THE OBJECTS WITH SAME IDS
			filterdata.forEach(function(sourceSample) {
		  
			  if(!datamerged.some(function(mergerow) { return mergerow.id === sourceSample.id; })) 
			  {
			    datamerged.push({ id: sourceSample.id, playTime: sourceSample.playTime, auto: sourceSample.auto });
			 	
			  } else {
			   
			   	let targetSample = datamerged.filter(function(target) { return target.id == sourceSample.id } )[0];
			    
			   	if(!sourceSample.auto)
			   		targetSample.auto = false;
			   	else
			   		targetSample.auto = true;	
			    
			    targetSample.playTime += sourceSample.playTime;

			  }

			});	

			filterdata = datamerged;
		}

		return filterdata
		
	}

	function sendFormData(e){
		e.preventDefault();
		// GET INPUT VALUES FROM THE FORM
		const id = parseInt(e.target[0].value);
		const minPlayTime = parseInt(e.target[1].value);
		const autoVal = e.target[2].value;
		const merge = e.target[3].checked;
		let auto;
		if(autoVal === "true") auto = true
		else if(autoVal === "false") auto = false

		// GET THE DATA FROM FILE
		fetch('/send', {
		  method: 'GET',
		  headers:{
		    'Content-Type': 'application/json'
		  }
		}).then(res => res.json())
		.then(sampledata => { 
			console.log('Success!');
			printCode.innerHTML = JSON.stringify(select(sampledata, {id: id, auto:auto, minPlayTime:minPlayTime, merge:merge}));
		})
		.catch(error => { printCode.innerHTML = 'Error: '+error; console.error('Error:', error) });


		
	}

}());