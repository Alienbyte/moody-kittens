/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
loadKittens()
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault();
  loadKittens()
  let form = event.target
  let kittenName = form.kittenName.value
  
  let currentKittenExists = kittens.includes(kitten => kitten.name == kittenName)
  
  if (!currentKittenExists) {
	id = kittens.length
    let newKitten = { id: id , name: kittenName , affection: 5 , mood: "Tolerant"}
    kittens.push(newKitten)
	saveKittens()
    drawKittens()
  }
  
  form.reset()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"))
  
  if (kittensData) {
	kittens = kittensData  
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let template = ""
  kittens.forEach(kitten => {
    template += `
	<div id="kitten-img-${kitten.id}" class="kitten-img card"><img src="https://robohash.org/${kitten.id}?set=set4">
    <div class="d-flex space-between-cat">
        <i class="fa fa-user"></i>
        ${kitten.name}
        <br>Mood: <div id="mood-${kitten.id}" class="catStats">${kitten.mood}</div>
        <br>Affection: <div id="affection-${kitten.id}" class="catStats">${kitten.affection}</div>
    </div>
	<button class="cat-button" onclick="pet(${kitten.id})">Pet</button>
	<button class="cat-button" onclick="catnip(${kitten.id})">Catnip</button>
	</div>
    `
  })
  
  document.getElementById("kittens").innerHTML = template
  kittenLen = kittens.length
  for(i=0; i < kittenLen; i++) {
	setKittenMood(i)
  }
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
	kitten = findKittenById(id)
	randomNum = Math.random()
	let array = JSON.parse(localStorage.getItem("kittens"))
	console.log(array[id].affection)
	let affection = array[id].affection
	if(randomNum < 0.7) {
		array[id].affection--
	} else {
		array[id].affection++
	}
	console.log(array[id].affection)
	
	document.getElementById(`affection-${kitten.id}`).innerHTML = JSON.stringify(array[id].affection)
	localStorage.setItem("kittens", JSON.stringify(array));
	setKittenMood(id)
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
	kitten = findKittenById(id)
	let array = JSON.parse(localStorage.getItem("kittens"))
	array[id].mood = "Tolerant"
	array[id].affection = 5
	
	localStorage.setItem("kittens", JSON.stringify(array));
	document.getElementById(`affection-${kitten.id}`).innerHTML = JSON.stringify(array[id].affection)
	document.getElementById(`mood-${kitten.id}`).innerHTML = array[id].mood
	
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {string} id
 */
function setKittenMood(id) {
	let kittensLocalArray = JSON.parse(localStorage.getItem("kittens"))
	let affection = kittensLocalArray[id].affection
	if (affection > 6) {
		kittensLocalArray[id].mood = "Happy"
		document.getElementById(`kitten-img-${id}`).classList.add("happy");
	} else if (affection <= 0) {
		kittensLocalArray[id].mood = "Gone"
		document.getElementById(`kitten-img-${id}`).classList.add("gone");
	} else if (affection <= 3) {
		kittensLocalArray[id].mood = "Angry"
		document.getElementById(`kitten-img-${id}`).classList.add("angry");
	} else if (affection <= 5) {
		kittensLocalArray[id].mood = "Tolerant"
		document.getElementById(`kitten-img-${id}`).classList.add("tolerant");
	}
	localStorage.setItem("kittens", JSON.stringify(kittensLocalArray));
	document.getElementById(`mood-${id}`).innerHTML = kittensLocalArray[id].mood
}

function getStarted() {
  document.getElementById("welcome").remove();
  drawKittens();
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}

function resetKittens() {
	kittens = [];
	window.localStorage.setItem("kittens", JSON.stringify(kittens));
	document.getElementById("kittens").innerHTML = "";
}