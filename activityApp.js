const urlBase =  'https://www.boredapi.com/api/activity?';
const rightChevron = document.getElementById('right-chevron');
const leftChevron = document.getElementById('left-chevron');
const peopleCounter = document.getElementById('people-counter');
const filterPrice = document.getElementById('filter_price');
let optionsParticipants = "";
let optionsPrice = "";
const submitBtn = document.getElementById('submit-btn');
const speechBubble = document.getElementById('speech-bubble');
const eyebrows = document.getElementById('eyebrows');



//----------SET NUMBER OF PEOPLE -----



let peopleOptions = ['1', '2', '3', '4+']
let currentPeople = 0

peopleCounter.innerHTML = peopleOptions[currentPeople]
rightChevron.addEventListener('click', addPeople);
leftChevron.addEventListener('click', minusPeople);


function minusPeople() {
	if (currentPeople == 0 ){
		currentPeople = peopleOptions.length - 1
	}
	else{
		currentPeople --
	}
	peopleCounter.innerHTML = peopleOptions[currentPeople]
	optionsParticipants = `&participants=${currentPeople}`
}

function addPeople() {

	if (currentPeople == peopleOptions.length - 1){
		currentPeople = 0 
	}
	else{
		currentPeople ++
	}
	peopleCounter.innerHTML = peopleOptions[currentPeople]
		optionsParticipants = `&participants=${currentPeople}`

}



// ---------  Price Filters -------------------


filterPrice.addEventListener("change", event => {
	const value = event.target.value;
	
	switch(value) {
		case "nothing":
			optionsPrice = "&price=0"
			break
		case "low":
			optionsPrice = "&minprice=0.1&maxprice=0.2"
			break
		case "medium":
			optionsPrice = "&minprice=0.3&maxprice=0.39"
			break
		case "high":
			optionsPrice = "&minprice=0.4";	
	}	
})

  // ---------  End of filterActivity() -------------------

async function getAndShowActivity() {
	displayLoading()
	const url = urlBase + optionsParticipants + optionsPrice;
	const activityPromise = await fetch(url);
const activities = await activityPromise.json();
	const delay = ms => new Promise(res => setTimeout(res, ms));

	

	if(activities.activity !== undefined) {
		eyebrows.classList.add('raised')
		speechBubble.textContent = `I know! ${activities.activity}`
		  await delay(2000);
				eyebrows.classList.remove('raised')


	} else {
		speechBubble.textContent = "I'm afraid I don't have any suggestions. Try inviting someone else or spending more money."
	};	
}

function displayLoading(){
speechBubble.innerHTML = `<p class = "loading">Let me think</p>`
}


submitBtn.addEventListener('click', getAndShowActivity)
						   


