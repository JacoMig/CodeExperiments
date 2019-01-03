const token = "ea6adc06e43890c9dd379ca6e419ae20275197d2";
const endpoint = `https://api.github.com/users?access_token=${token}`;
let arrayOfUsers = [];
let isSingle = false;
const buttonPrint = document.querySelector('.print');
const inputNumbers = document.querySelector('.users__number');
const inputSingle = document.querySelector('.user__name');
const containerUsers = document.querySelector('.containerUsers ul');
const preloaderDots = document.querySelectorAll('.dot');
/*const canvas = document.getElementById('myChart');
const ctx = canvas.getContext('2d');*/

async function fetchUsers (users){
	const api_call = await fetch(`${endpoint}&per_page=${users}`);
	const data = await api_call.json();
	
	return data;	
}


async function showUsers(){
	arrayOfUsers = [];
	containerUsers.innerHTML = "";
	containerUsers.classList.remove('selected')
	preloaderDots.forEach(dot => {
		dot.classList.add('move')
	})
	if(!isSingle){
		await fetchUsers(inputNumbers.value).then(data => arrayOfUsers.push(...data))
		const promises = arrayOfUsers.map(async user => {
			const response = await fetch(`https://api.github.com/users/${user.login}?access_token=${token}`)
			const users = await response.json()
			return users
		})
		const results = await Promise.all(promises)

		arrayOfUsers = await results
		
	}else{
		const response = await fetch(`https://api.github.com/users/${inputSingle.value}?access_token=${token}`)
					.then(resp => resp.json())
					.then(data => { 
						if(data.login === undefined)
							containerUsers.innerHTML = "<p>User does not exists!</p>"
						else
							return data
					})
					.catch(error => console.log(error) )
		
		await arrayOfUsers.push(response)
	}

	const html = arrayOfUsers.map(user => {
		return `<li class="user" id="${user.login}" onClick=printGraphic(this)>
					<div>${user.name}</div>
					<div class="location">
						<em>${user.location}</em>
					</div>
					<div class="info">
						<div class="avatar"><img src="${user.avatar_url}" alt="avatar ${user.login}" /></div>
						<div class="followers"><span>Followers: </span><span>${user.followers}</span></div>
						<div class="following"><span>Following: </span><span>${user.following}</span></div>
						<div class="repos"><span>Repositories: </span><span>${user.public_repos}</span></div>
					</div>
				</li>`
	}).join('')

	containerUsers.innerHTML = html	

	// PRELOAD ANIMATION
	preloaderDots.forEach(dot => {
		dot.classList.remove('move');
	})
	console.log(arrayOfUsers)

	let i = 0;
	const itemInterval = setInterval( function(){
		const items = document.querySelectorAll('.user')
		const itemsLength = items.length;
		if(i >= itemsLength)
			clearInterval(itemInterval)
		else 
			items[i].classList.add('visible');
		i++;
	},200);

}


function printGraphic(thisuser){
	const users = document.querySelectorAll('.user')
	containerUsers.classList.add('selected')
	users.forEach(item => {
		if(!item.id.includes(thisuser.id)){
			item.classList.remove('openUp');
			item.querySelector('.info').classList.remove('visible')
		}else{
			/*userPosition = item.offsetY;*/
			
			item.classList.toggle('openUp');
			item.querySelector('.info').classList.toggle('visible')
		}
	})
	const activeUser = Array.from(users).some(user => {
		if(user.classList.contains('openUp'))
			return true
	})
	if(!activeUser)
		containerUsers.classList.remove('selected')

}

function enterKey(e){
	if(e.keyCode == 13) 
		showUsers();
}

inputSingle.addEventListener('change', (e) => { isSingle = e.target.value != "" ? true : false  });
inputSingle.addEventListener('keyup', enterKey);
inputNumbers.addEventListener('keyup', enterKey);
buttonPrint.addEventListener('click', showUsers);







